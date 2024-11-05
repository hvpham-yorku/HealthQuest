const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

module.exports = { getUsers };
