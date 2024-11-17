const User = require('../models/Users');

// Middleware function for updating streaks
const updateStreakMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            console.error('User not found for streak update:', req.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });
        console.log("Server Time:", new Date().toString());

        console.log('User before streak update:', {
            streak: user.streak,
            lastLoginDate: user.lastLoginDate,
            today,
        });

        if (user.lastLoginDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split('T')[0];

            if (user.lastLoginDate === yesterdayString) {
                user.streak += 1; // Increment streak
            } else {
                user.streak = 1; // Reset streak
            }

            user.lastLoginDate = today; // Update last login date
            await user.save();

            console.log('User after streak update:', {
                streak: user.streak,
                lastLoginDate: user.lastLoginDate,
            });
        }

        next();
    } catch (error) {
        console.error('Streak update error:', error.message);
        res.status(500).json({ message: 'Failed to update streak' });
    }
};


module.exports = updateStreakMiddleware;
