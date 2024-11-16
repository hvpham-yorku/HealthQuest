/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: User progress management
 */

const express = require('express');
const router = express.Router(); // Initialize the router
const User = require('../models/Users'); // Import User model
const verifyToken = require('../middleware/authMiddleware'); // Import auth middleware

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Fetch user progress
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 level:
 *                   type: number
 *                   description: User's current level
 *                 xp:
 *                   type: number
 *                   description: Current XP of the user
 *                 xpForNextLevel:
 *                   type: number
 *                   description: XP required to reach the next level
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/progress:
 *   put:
 *     summary: Update user progress
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               xp:
 *                 type: number
 *                 description: XP to add to the user's progress
 *     responses:
 *       200:
 *         description: Updates user progress and returns updated values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 level:
 *                   type: number
 *                   description: Updated user level
 *                 xp:
 *                   type: number
 *                   description: Remaining XP after updates
 *                 xpForNextLevel:
 *                   type: number
 *                   description: Updated XP required for the next level
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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
