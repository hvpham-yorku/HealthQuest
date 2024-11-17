const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Calories = require('../models/Calories');

/**
 * @swagger
 * /api/calories/log:
 *   post:
 *     summary: Log or update calories burned for a specific date
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: Date in 'YYYY-MM-DD' format
 *                 example: "2024-11-16"
 *               caloriesBurned:
 *                 type: number
 *                 description: Calories burned for the date
 *                 example: 500
 *     responses:
 *       200:
 *         description: Successfully logged or updated calories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Calories logged successfully"
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Internal server error
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
