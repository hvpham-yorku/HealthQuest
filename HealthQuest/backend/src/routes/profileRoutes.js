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

// Get user profile
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

// Update user profile
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
