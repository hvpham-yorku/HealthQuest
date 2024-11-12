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

// Update user progress with automatic level handling
router.put('/progress', verifyToken, async (req, res) => {
    const { xp } = req.body; // Only pass XP changes from frontend
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update XP and handle level logic
        let updatedXp = user.xp + xp;
        let updatedLevel = user.level;
        let updatedXpForNextLevel = user.xpForNextLevel;

        while (updatedXp >= updatedXpForNextLevel) {
            updatedXp -= updatedXpForNextLevel;
            updatedLevel++;
            updatedXpForNextLevel = Math.round(updatedXpForNextLevel * 1.2); // Increase XP threshold
        }

        user.level = updatedLevel;
        user.xp = updatedXp;
        user.xpForNextLevel = updatedXpForNextLevel;

        await user.save();

        res.status(200).json({
            level: user.level,
            xp: user.xp,
            xpForNextLevel: user.xpForNextLevel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router; // Export the router
