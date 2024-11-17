const mongoose = require('mongoose');

/**
 * The model for a user Login.  Specifies userId, loginTime and ipAddress to address security.
 */
const loginSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: { type: String },
});

module.exports = mongoose.model('Login', loginSchema);
