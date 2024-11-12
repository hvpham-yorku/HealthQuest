const mongoose = require('mongoose');


// Calories.js
const caloriesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    caloriesBurned: { type: Number, default: 0 },
});

module.exports = mongoose.model('Calories', caloriesSchema);