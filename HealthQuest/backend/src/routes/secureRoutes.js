const express = require('express');
const router = express.Router();

// Initializes the router connection
router.get('/', (req, res) => {
    res.send('Welcome to the secure routes');
});

module.exports = router;
