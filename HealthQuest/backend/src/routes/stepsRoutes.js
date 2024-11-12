const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Steps = require('../models/Steps');

const router = express.Router();

// Add steps for today
router.post('/add', verifyToken, async (req, res) => {
    const { userId } = req;
    const { steps } = req.body;
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });

    try {
        let stepRecord = await Steps.findOne({ userId, date: today });

        if (!stepRecord) {
            stepRecord = new Steps({ userId, date: today, steps: steps });
        } else {
            stepRecord.steps += steps;
        }

        await stepRecord.save();
        res.status(200).json(stepRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error updating steps', error: error.message });
    }
});

// Fetch today's steps and history
router.get('/history', verifyToken, async (req, res) => {
    const { userId } = req;

    try {
        const history = await Steps.find({ userId }).sort({ date: -1 });
        const today = history.find((record) => record.date === new Date().toISOString().split('T')[0]) || { steps: 0 };
        res.status(200).json({ today, history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching steps history', error: error.message });
    }
});

module.exports = router;
