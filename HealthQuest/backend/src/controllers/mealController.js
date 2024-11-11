const Meal = require('../models/Meal');

// Add meal
// Add meal
const addMeal = async (req, res) => {
    try {
        const { name, calories, protein, carbohydrates, fats } = req.body; // Ensure "carbohydrates" is used here
        const meal = await Meal.create({
            userId: req.userId, 
            name,
            calories,
            protein,
            carbohydrates, // Use "carbohydrates"
            fats,
        });
        res.status(201).json({ message: 'Meal added successfully', meal });
    } catch (error) {
        console.error('Error adding meal:', error.message);
        res.status(500).json({ message: 'Error adding meal' });
    }
};


// Get meals
const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.userId }); // Use the userId from middleware
        res.status(200).json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error.message);
        res.status(500).json({ message: 'Error fetching meals' });
    }
};

module.exports = { addMeal, getMeals };
