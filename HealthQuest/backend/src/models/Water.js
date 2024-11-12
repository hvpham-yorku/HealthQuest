const mongoose = require('mongoose');

const HydrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    cupsConsumed: { type: Number, default: 0 },
});

const Hydration = mongoose.model('Hydration', HydrationSchema);
module.exports = Hydration;
