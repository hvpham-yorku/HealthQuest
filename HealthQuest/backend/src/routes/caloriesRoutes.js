const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Calories = require('../models/Calories');

/**
 * Maps calories burned to a user.
 */
router.post('/log', verifyToken, async (req, res) => {
    const { date, caloriesBurned } = req.body;

    try {
        const existingEntry = await Calories.findOne({ userId: req.userId, date });

        if (existingEntry) {
            // Update existing entry
            existingEntry.caloriesBurned += caloriesBurned;
            await existingEntry.save();
        } else {
            // Create a new entry
            const newEntry = new Calories({
                userId: req.userId,
                date,
                caloriesBurned,
            });
            await newEntry.save();
        }

        res.status(200).json({ message: 'Calories logged successfully' });
    } catch (error) {
        console.error('Error logging calories:', error.message);
        res.status(500).json({ message: 'Failed to log calories' });
    }
});

module.exports = router;
