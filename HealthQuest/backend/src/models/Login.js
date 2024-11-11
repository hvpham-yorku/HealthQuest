const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: { type: String },
});

module.exports = mongoose.model('Login', loginSchema);
