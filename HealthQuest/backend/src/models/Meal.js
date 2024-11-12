const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: String, required: false },
    carbohydrates: { type: String, required: false },
    fats: { type: String, required: false },
    date: { 
        type: String, 
        default: () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' }) // Ensures correct timezone
    },
});

module.exports = mongoose.model('Meal', mealSchema);
