import React, { useEffect, useState } from 'react';
import { addMeal } from '../services/userService';
import axios from 'axios';

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
        <div style={{ textAlign: 'center' }}>
            <h2>Dashboard</h2>
            {loggedInUser ? (
                <h3>Welcome, {loggedInUser.name}!</h3>
            ) : (
                <h3>Please log in</h3>
            )}
            
            
            <div>
                <h2>Dashboard</h2>
                <p style={{ fontSize: '24px', color: 'orange' }}>
                    🔥 Streak: <span style={{ fontWeight: 'bold' }}>{streak} days</span>
                </p>
            </div>

            <div style={{ width: '200px', border: '1px solid #ddd', borderRadius: '5px', margin: '10px auto' }}>
                <div
                style={{
                    width: `${(streak % 7) * 14.28}%`, // Progress for each week
                    backgroundColor: 'green',
                    height: '10px',
                    borderRadius: '5px',
                }}
                ></div>
            </div>



            <div style={{ marginTop: '20px' }}>
                <h3>Level System</h3>
                <p>Level: {level}</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            width: '200px',
                            border: '1px solid #333',
                            borderRadius: '5px',
                            background: '#eee',
                            marginBottom: '5px',
                        }}
                    >
                        <div
                            style={{
                                width: `${(xp / xpForNextLevel) * 100}%`,
                                height: '20px',
                                backgroundColor: '#4caf50',
                                borderRadius: '5px',
                            }}
                        ></div>
                    </div>
                </div>
                <p>{xp}/{xpForNextLevel} XP</p>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Trackers</h3>
                <div>
                    <h4>Total Calories: {calories}</h4>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>Meal Tracker</h3>
                    <form onSubmit={handleAddMeal}>
                        <div>
                            <label>
                                Meal Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={mealForm.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Calories:
                                <input
                                    type="number"
                                    name="calories"
                                    value={mealForm.calories}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Protein:
                                <input
                                    type="text"
                                    name="protein"
                                    value={mealForm.protein}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10g"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Carbohydrates:
                                <input
                                    type="text"
                                    name="carbohydrates"
                                    value={mealForm.carbohydrates}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 20g"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Fats:
                                <input
                                    type="text"
                                    name="fats"
                                    value={mealForm.fats}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5g"
                                />
                            </label>
                        </div>
                        <button type="submit">Add Meal</button>
                    </form>

                    <h4>Meals:</h4>
                    <ul>
                        {meals.map((meal, index) => (
                            <div key={index}>
                                <strong>{meal.name}</strong> - {meal.calories} kcal
                                <ul>
                                    <div>Protein: {meal.protein}</div>
                                    <div>Carbohydrates: {meal.carbohydrates}</div>
                                    <div>Fats: {meal.fats}</div>
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
