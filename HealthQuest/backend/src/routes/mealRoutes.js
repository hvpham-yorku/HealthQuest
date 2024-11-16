const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); 
const { addMeal, getMeals } = require('../controllers/mealController');

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Retrieve all meals for the authenticated user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of meals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the meal
 *                   calories:
 *                     type: number
 *                     description: Calories in the meal
 *                   protein:
 *                     type: string
 *                     description: Protein content of the meal
 *                   carbohydrates:
 *                     type: string
 *                     description: Carbohydrate content of the meal
 *                   fats:
 *                     type: string
 *                     description: Fat content of the meal
 *                   date:
 *                     type: string
 *                     description: Date the meal was added (YYYY-MM-DD format)
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, getMeals);

/**
 * @swagger
 * /api/meals:
 *   post:
 *     summary: Add a new meal for the authenticated user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the meal
 *                 example: Chicken Salad
 *               calories:
 *                 type: number
 *                 description: Calories in the meal
 *                 example: 450
 *               protein:
 *                 type: string
 *                 description: Protein content in grams
 *                 example: "30g"
 *               carbohydrates:
 *                 type: string
 *                 description: Carbohydrate content in grams
 *                 example: "20g"
 *               fats:
 *                 type: string
 *                 description: Fat content in grams
 *                 example: "15g"
 *     responses:
 *       201:
 *         description: Successfully added the meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the meal
 *                 message:
 *                   type: string
 *                   example: "Meal added successfully"
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, addMeal);

module.exports = router;
