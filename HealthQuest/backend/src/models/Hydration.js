const mongoose = require('mongoose');

/**
 * Creates the model for hydration.  Initializes cups consumed with a specified number, or a default value of 0 if none specified.
 */
const hydrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Store date in 'YYYY-MM-DD' format
    cupsConsumed: { type: Number, default: 0 },
});

module.exports = mongoose.models.Hydration || mongoose.model('Hydration', hydrationSchema);
