const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: String, required: false },
    carbohydrates: { type: String, required: false }, // Consistent field name
    fats: { type: String, required: false },
});

module.exports = mongoose.model('Meal', mealSchema);

