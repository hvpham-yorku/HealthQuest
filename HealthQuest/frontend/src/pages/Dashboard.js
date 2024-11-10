import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [calories, setCalories] = useState(0);
    const [water, setWater] = useState(0);
    const [meals, setMeals] = useState([]);
    const [mealForm, setMealForm] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [xpForNextLevel, setXpForNextLevel] = useState(20);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUsers();
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMealForm({
            ...mealForm,
            [name]: value
        });
    };

    const handleAddMeal = (e) => {
        e.preventDefault();
        const mealCalories = parseInt(mealForm.calories, 10) || 0;

        const newMeal = {
            ...mealForm,
            calories: mealCalories,
            protein: mealForm.protein || "0g",
            carbs: mealForm.carbs || "0g",
            fats: mealForm.fats || "0g"
        };

        setMeals([...meals, newMeal]);
        setCalories(calories + mealCalories);
        setMealForm({ name: '', calories: '', protein: '', carbs: '', fats: '' });

        gainXp(5);
    };

    const incrementWater = () => {
        setWater(water + 1);
        gainXp(2);
    };

    const decrementWater = () => setWater(Math.max(0, water - 1));

    const gainXp = (amount) => {
        const newXp = xp + amount;
        if (newXp >= xpForNextLevel) {
            setLevel(level + 1);
            setXp(newXp - xpForNextLevel);
            setXpForNextLevel(Math.round(xpForNextLevel * 1.5));
        } else {
            setXp(newXp);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Dashboard</h2>

            <h3>User List:</h3>
            <ul>
                {users.map((user) => (
                    <div key={user.id}>{user.name}</div>
                ))}
            </ul>

            {/* Level and XP Progress Bar */}
            <div style={{ marginTop: '20px' }}>
                <h3>Level System</h3>
                <p>Level: {level}</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ 
                        width: '200px', 
                        border: '1px solid #333', 
                        borderRadius: '5px', 
                        background: '#eee', 
                        marginBottom: '5px' 
                    }}>
                        <div
                            style={{
                                width: `${(xp / xpForNextLevel) * 100}%`,
                                height: '20px',
                                backgroundColor: '#4caf50',
                                borderRadius: '5px'
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

                <div>
                    <h4>Water: {water} glasses</h4>
                    <button onClick={incrementWater}>+</button>
                    <button onClick={decrementWater}>-</button>
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
                                    name="carbs"
                                    value={mealForm.carbs}
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
                                    <div>Carbs: {meal.carbs}</div>
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
