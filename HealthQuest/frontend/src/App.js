import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import HealthStats from './pages/HealthStats';
import { getUsers } from './services/userService';

function App() {
    const [, setUsers] = useState([]); // Replace `const [users, setUsers]` with `const [, setUsers]` if `users` is unused

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

    return (
        <Router>
            <div className="App">
                <Header />
                <nav>
                    <Link to="/">Dashboard</Link> | 
                    <Link to="/profile">User Profile</Link> | 
                    <Link to="/stats">Health Stats</Link>
                </nav>
                
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/stats" element={<HealthStats />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
