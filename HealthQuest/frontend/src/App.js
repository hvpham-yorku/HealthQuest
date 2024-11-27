import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import HealthStats from './pages/HealthStats';
import Login from './pages/Login';
import Register from './pages/Register';
import HydrationPage from './pages/HydrationPage';
import StepsPage from './pages/StepsPage';
import StreaksPage from './pages/StreakPage'; // Import StreaksPage

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <nav className="navbar">
                    <Link to="/" className="nav-link">Dashboard</Link>
                    <Link to="/profile" className="nav-link">User Profile</Link>
                    <Link to="/stats" className="nav-link">Health Stats</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/HydrationPage" className="nav-link">Hydration</Link>
                    <Link to="/steps" className="nav-link">Steps</Link>
                    <Link to="/streaks" className="nav-link">Streaks</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/stats" element={<HealthStats />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/HydrationPage" element={<HydrationPage />} />
                    <Route path="/steps" element={<StepsPage />} />
                    <Route path="/streaks" element={<StreaksPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
