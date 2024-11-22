
/**
 * @swagger
 * tags:
 *   name: Steps
 *   description: API for managing user step data
 */
const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Steps = require('../models/Steps');

const router = express.Router();

/**
 * @swagger
 * /api/steps/add:
 *   post:
 *     summary: Add steps for today
 *     tags: [Steps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               steps:
 *                 type: number
 *                 description: Number of steps to add
 *                 example: 500
 *     responses:
 *       200:
 *         description: Steps added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 steps:
 *                   type: number
 *       500:
 *         description: Error updating steps
 */
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

/**
 * @swagger
 * /api/steps/history:
 *   get:
 *     summary: Fetch today's steps and step history
 *     tags: [Steps]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched step history
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
 *                       format: date
 *                     steps:
 *                       type: number
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       steps:
 *                         type: number
 *       500:
 *         description: Error fetching step history
 */
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
