const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const updateStreakMiddleware = require('../middleware/streakMiddleware');
const User = require('../models/Users'); // Add this to import User model


// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Route with streak middleware
router.get('/profile', verifyToken, updateStreakMiddleware, async (req, res) => {
    try {
        console.log('Profile route accessed for user ID:', req.userId);

        const user = await User.findById(req.userId);
        if (!user) {
            console.error('User not found in profile route:', req.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User profile fetched:', user);

        res.status(200).json({ name: user.name, streak: user.streak });
    } catch (error) {
        console.error('Error in profile route:', error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
