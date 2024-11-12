const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const Login = require('../models/Login'); // Log login events

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("User from DB:", user); // Debugging
        console.log("Password Match:", isMatch); // Debugging

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        await Login.create({ userId: user._id, ipAddress: req.ip });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save(); // Save user explicitly

        console.log("User created:", newUser); // Debugging
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { loginUser, registerUser };
