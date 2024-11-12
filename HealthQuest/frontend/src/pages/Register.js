import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            console.error('Error during registration:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                <br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
