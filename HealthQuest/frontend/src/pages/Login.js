import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/userService';
import './Login.css'; // Import the scoped CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if a user is already logged in
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token); // Save the token
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user info
            setUser(data.user); // Update state with logged-in user
            alert(`Welcome, ${data.user.name}!`);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        alert('You have been logged out!');
    };

    return (
        <div className="login-page">
            {user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
