import axios from 'axios';

export const getUsers = async () => {
    const response = await axios.get('/api/users');
    return response.data;
};

export const addMeal = async (meal) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        'http://localhost:5000/api/meals',
        meal,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const getMeals = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        'http://localhost:5000/api/meals',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/users/login',
            { email, password }
        );
        return response.data; // Expects token and user object in response
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to login');
    }
};
