/**
 * @fileoverview Database connection file for MongoDB.
 * This file establishes a connection to the MongoDB database using Mongoose.
 */

const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database.
 * @async
 * @function
 * @returns {Promise<void>} Logs success or exits the process on failure.
 * Connect to the DB and log whether the connection has been successfully established.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;