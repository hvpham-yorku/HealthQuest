import React, { useEffect, useState } from 'react';
import { addMeal } from '../services/userService';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [calories, setCalories] = useState(0);
    const [meals, setMeals] = useState([]);
    const [mealForm, setMealForm] = useState({
        name: '',
        calories: '',
        protein: '',
        carbohydrates: '',
        fats: '',
    });

    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [xpForNextLevel, setXpForNextLevel] = useState(20);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoggedInUser(user);
            fetchProgress(user.id);
            fetchMeals(user.id);
        }
    }, []);

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStreak(response.data.streak);
            } catch (error) {
                console.error('Error fetching streak:', error.message);
            }
        };

        fetchStreak();
    }, []);

    const fetchProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/users/progress`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { level, xp, xpForNextLevel } = response.data;
            setLevel(level);
            setXp(xp);
            setXpForNextLevel(xpForNextLevel);
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

    const fetchMeals = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/meals`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeals(response.data);

            const totalCalories = response.data.reduce((sum, meal) => sum + meal.calories, 0);
            setCalories(totalCalories);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMealForm({
            ...mealForm,
            [name]: value,
        });
    };

    const handleAddMeal = async (e) => {
        e.preventDefault();
        const mealCalories = parseInt(mealForm.calories, 10) || 0;
        const newMeal = {
            ...mealForm,
            calories: mealCalories,
            protein: mealForm.protein || '0g',
            carbohydrates: mealForm.carbohydrates || '0g',
            fats: mealForm.fats || '0g',
        };

        try {
            const token = localStorage.getItem('token');
            const savedMealResponse = await addMeal({ ...newMeal, userId: loggedInUser.id }, token);
            setMeals((prevMeals) => [...prevMeals, savedMealResponse.meal]);
            setMealForm({ name: '', calories: '', protein: '', carbohydrates: '', fats: '' });
            setCalories((prevCalories) => prevCalories + mealCalories);
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    return (
        <div className="dashboard-container">
            {loggedInUser ? (
                <h2 className="dashboard-title">Welcome, {loggedInUser.name}!</h2>
            ) : (
                <h2 className="dashboard-title">Please log in</h2>
            )}

            <div className="dashboard-flex-container">
                {/* Left Column */}
                <div className="dashboard-left-column">
                    <div className="dashboard-section">
                        <h3>🔥 Your Streak</h3>
                        <p>{streak} day(s)</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(streak % 7) * 14.28}%` }}></div>
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h3>Level and Progress</h3>
                        <p>Level: {level}</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(xp / xpForNextLevel) * 100}%` }}></div>
                        </div>
                        <p>{xp}/{xpForNextLevel} XP</p>
                    </div>

                    <div className="dashboard-section">
                        <h3>📊 Trackers</h3>
                        <p>Total Calories: {calories}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right-column">
                    <div className="dashboard-section meal-tracker">
                        <h3>🍽️ Meal Tracker</h3>
                        <form onSubmit={handleAddMeal} className="meal-form">
                            <input
                                type="text"
                                name="name"
                                value={mealForm.name}
                                onChange={handleInputChange}
                                placeholder="Meal Name"
                                required
                            />
                            <input
                                type="number"
                                name="calories"
                                value={mealForm.calories}
                                onChange={handleInputChange}
                                placeholder="Calories"
                                required
                            />
                            <input
                                type="text"
                                name="protein"
                                value={mealForm.protein}
                                onChange={handleInputChange}
                                placeholder="Protein (e.g., 10g)"
                            />
                            <input
                                type="text"
                                name="carbohydrates"
                                value={mealForm.carbohydrates}
                                onChange={handleInputChange}
                                placeholder="Carbohydrates (e.g., 20g)"
                            />
                            <input
                                type="text"
                                name="fats"
                                value={mealForm.fats}
                                onChange={handleInputChange}
                                placeholder="Fats (e.g., 5g)"
                            />
                            <button type="submit">Add Meal</button>
                        </form>

                        <h3>Meals:</h3>
                        <ul className="meal-list">
                            {meals.map((meal, index) => (
                                <li key={index} className="meal-item">
                                    <div className="meal-header">
                                        <h4>{meal.name}</h4>
                                        <span className="meal-calories">{meal.calories} kcal</span>
                                    </div>
                                    <div className="meal-details">
                                        <div className="meal-detail">
                                            <strong>Protein:</strong> {meal.protein}g
                                        </div>
                                        <div className="meal-detail">
                                            <strong>Carbohydrates:</strong> {meal.carbohydrates}g
                                        </div>
                                        <div className="meal-detail">
                                            <strong>Fats:</strong> {meal.fats}g
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
