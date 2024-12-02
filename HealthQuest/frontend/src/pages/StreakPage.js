import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StreakPage.css';
import { useDarkMode } from '../context/DarkModeContext'; // Assuming DarkModeContext exists

const StreakPage = () => {
    const [streak, setStreak] = useState(0);
    const [streakTitle, setStreakTitle] = useState('Newbie 🔰');
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useDarkMode(); // Access dark mode state

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStreak(response.data.streak);
                updateStreakTitle(response.data.streak);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching streak:', error);
                setLoading(false);
            }
        };
        fetchStreak();
    }, []);

    const updateStreakTitle = (streak) => {
        if (streak >= 100) setStreakTitle('Legend 🔥');
        else if (streak >= 30) setStreakTitle('Trailblazer 🚀');
        else if (streak >= 7) setStreakTitle('Committed 🌟');
        else setStreakTitle('Newbie 🔰');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div
            className={`streak-page ${
                streak >= 100
                    ? 'legend'
                    : streak >= 30
                    ? 'trailblazer'
                    : streak >= 7
                    ? 'committed'
                    : ''
            } ${isDarkMode ? 'dark-mode' : ''}`} // Add dark mode class
        >
            <h1>🔥 Streak Tracker</h1>
            <p className="streak-title">{streakTitle}</p>
            <p>Your Current Streak: <strong>{streak} days</strong></p>
        </div>
    );
};

export default StreakPage;
