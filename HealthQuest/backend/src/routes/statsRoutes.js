const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Hydration = require('../models/Hydration');
const Steps = require('../models/Steps');
const Meal = require('../models/Meal');

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
