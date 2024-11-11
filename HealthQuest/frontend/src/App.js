import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import HealthStats from './pages/HealthStats';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <nav>
                    <Link to="/">Dashboard</Link> | 
                    <Link to="/profile">User Profile</Link> | 
                    <Link to="/stats">Health Stats</Link> | 
                    <Link to="/login">Login</Link> | 
                    <Link to="/register">Register</Link>
                </nav>
                
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/stats" element={<HealthStats />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
