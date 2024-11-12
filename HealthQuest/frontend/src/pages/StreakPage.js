import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StreakPage = () => {
    const [streak, setStreak] = useState(0);
    const [streakTitle, setStreakTitle] = useState('Newbie 🔰');
    const [loading, setLoading] = useState(true);

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
            style={{
                background: streak >= 100 ? 'linear-gradient(45deg, red, orange, yellow)' :
                    streak >= 30 ? 'linear-gradient(45deg, blue, purple)' :
                        streak >= 7 ? 'linear-gradient(45deg, green, teal)' :
                            'linear-gradient(45deg, lightgray, white)',
                animation: 'gradientAnimation 5s infinite alternate',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#745',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h1>🔥 Streak Tracker</h1>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{streakTitle}</p>
            <p>Your Current Streak: <strong>{streak} days</strong></p>
        </div>
    );
};

export default StreakPage;
