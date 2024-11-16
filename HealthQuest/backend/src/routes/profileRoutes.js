const express = require('express');
const multer = require('multer');
const User = require('../models/Users');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Ensure this path exists
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
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
 *                 profilePicture:
 *                   type: string
 *                   description: URL of the profile picture
 *                 bio:
 *                   type: string
 *                   description: User's bio
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of user goals
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching profile
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            profilePicture: user.profilePicture,
            bio: user.bio,
            goals: user.goals,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture file
 *               bio:
 *                 type: string
 *                 description: User's bio
 *               goals:
 *                 type: string
 *                 description: JSON string representing user goals
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profilePicture:
 *                   type: string
 *                   description: URL of the updated profile picture
 *                 bio:
 *                   type: string
 *                   description: Updated bio
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Updated list of goals
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating profile
 */
router.put('/', verifyToken, upload.single('profilePicture'), async (req, res) => {
    const { bio, goals } = req.body;
    const updateData = { bio, goals: JSON.parse(goals) };

    if (req.file) {
        updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});



module.exports = router;
