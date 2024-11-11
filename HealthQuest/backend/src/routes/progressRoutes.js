const express = require('express');
const router = express.Router(); // Initialize the router
const User = require('../models/Users'); // Import User model
const verifyToken = require('../middleware/authMiddleware'); // Import auth middleware

// Fetch user progress
router.get('/progress', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Use req.userId
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            level: user.level,
            xp: user.xp,
            xpForNextLevel: user.xpForNextLevel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user progress
router.put('/progress', verifyToken, async (req, res) => {
    const { level, xp, xpForNextLevel } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, // Use req.userId
            { level, xp, xpForNextLevel },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            level: updatedUser.level,
            xp: updatedUser.xp,
            xpForNextLevel: updatedUser.xpForNextLevel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router; // Export the router
