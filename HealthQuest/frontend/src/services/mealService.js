import axios from 'axios';

export const addMeal = async (meal, token) => {
    const response = await axios.post('/api/meals', meal, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getMeals = async (token) => {
    const response = await axios.get('/api/meals', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
