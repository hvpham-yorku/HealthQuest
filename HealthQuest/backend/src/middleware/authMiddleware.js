const jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Middleware function for user authentication
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.userId = decoded.id; // Attach user ID to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: "Invalid token" });
    }
    
};

module.exports = verifyToken;
