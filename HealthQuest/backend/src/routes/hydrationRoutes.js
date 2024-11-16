const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Hydration = require('../models/Water');

const router = express.Router();

/**
 * @swagger
 * /api/hydration/add:
 *   post:
 *     summary: Add cups of water to today's hydration record
 *     tags: [Hydration]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cups:
 *                 type: number
 *                 description: Number of cups to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Hydration record updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                 cupsConsumed:
 *                   type: number
 *       500:
 *         description: Error updating hydration
 */
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

/**
 * @swagger
 * /api/hydration/history:
 *   get:
 *     summary: Get user's hydration history
 *     tags: [Hydration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hydration history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 today:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                     cupsConsumed:
 *                       type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       cupsConsumed:
 *                         type: number
 *       500:
 *         description: Error fetching hydration history
 */
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
