const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Hydration = require('../models/Water');

const router = express.Router();

// Add cups for today's hydration
router.post('/add', verifyToken, async (req, res) => {
    const { userId } = req;
    const { cups } = req.body;
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });

    try {
        let hydration = await Hydration.findOne({ userId, date: today });

        if (!hydration) {
            hydration = new Hydration({ userId, date: today, cupsConsumed: cups });
        } else {
            hydration.cupsConsumed += cups;
        }

        await hydration.save();
        res.status(200).json(hydration);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hydration', error: error.message });
    }
});

// Get hydration history
router.get('/history', verifyToken, async (req, res) => {
    const { userId } = req;
    const today = new Date().toISOString().split('T')[0];

    try {
        const history = await Hydration.find({ userId }).sort({ date: -1 });
        const todayRecord = history.find((record) => record.date === today) || { cupsConsumed: 0 };
        res.status(200).json({ today: todayRecord, history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hydration history', error: error.message });
    }
});


module.exports = router;
