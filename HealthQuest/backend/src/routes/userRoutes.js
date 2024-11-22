/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user authentication and profile management
 */

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const updateStreakMiddleware = require('../middleware/streakMiddleware');
const User = require('../models/Users'); // Add this to import User model


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 streak:
 *                   type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/profile', verifyToken, updateStreakMiddleware, async (req, res) => {
    try {
        console.log('Profile route accessed for user ID:', req.userId);

        const user = await User.findById(req.userId);
        if (!user) {
            console.error('User not found in profile route:', req.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User profile fetched:', user);

        res.status(200).json({ name: user.name, streak: user.streak });
    } catch (error) {
        console.error('Error in profile route:', error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
