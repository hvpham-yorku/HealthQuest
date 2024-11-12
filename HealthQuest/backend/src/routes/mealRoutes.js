const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Ensure middleware is correct
const { addMeal, getMeals } = require('../controllers/mealController');

// Fetch meals
router.get('/', authenticate, getMeals);

// Add a new meal
router.post('/', authenticate, addMeal);

module.exports = router;
