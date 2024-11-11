const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    xpForNextLevel: { type: Number, default: 20 },
    profilePicture: { type: Buffer },
    bio: { type: String, default: '' },
    goals: {
        calories: { type: Number, default: 2000 },
        hydration: { type: Number, default: 8 },
    },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Export the user model
const User = mongoose.model('User', userSchema);
module.exports = User;
