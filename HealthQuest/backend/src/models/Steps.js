const mongoose = require('mongoose');

const StepsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    steps: { type: Number, default: 0 },
});

const Steps = mongoose.model('Steps', StepsSchema);
module.exports = Steps;
