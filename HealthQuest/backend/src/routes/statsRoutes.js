/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: User health statistics API
 */
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Hydration = require('../models/Hydration');
const Steps = require('../models/Steps');
const Meal = require('../models/Meal');

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get user health statistics
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user health statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hydration:
 *                   type: array
 *                   items:
 *                     type: number
 *                 steps:
 *                   type: array
 *                   items:
 *                     type: number
 *                 calories:
 *                   type: array
 *                   items:
 *                     type: number
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Failed to fetch stats
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch hydration and steps data
        const hydrationData = await Hydration.find({ userId });
        const stepsData = await Steps.find({ userId });

        // Aggregate calories per date
        const meals = await Meal.find({ userId });
        const caloriesData = meals.reduce((acc, meal) => {
            acc[meal.date] = (acc[meal.date] || 0) + meal.calories;
            return acc;
        }, {});

        const dates = [...new Set([...hydrationData, ...stepsData, ...Object.keys(caloriesData)].map(item => item.date))];

        // Map data into aligned arrays
        const hydration = dates.map(date => hydrationData.find(item => item.date === date)?.cupsConsumed || 0);
        const steps = dates.map(date => stepsData.find(item => item.date === date)?.steps || 0);
        const calories = dates.map(date => caloriesData[date] || 0);

        res.status(200).json({ hydration, steps, calories, dates });
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
});

module.exports = router;
