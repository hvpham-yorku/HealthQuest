import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HydrationTracker.css'; // Import the scoped CSS file

const HydrationTracker = () => {
    const [water, setWater] = useState(0);
    const [hydrationHistory, setHydrationHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHydrationData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/hydration/history', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWater(response.data.today.cupsConsumed);
                setHydrationHistory(response.data.history);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hydration data:', error);
                setLoading(false);
            }
        };
        fetchHydrationData();
    }, []);

    const incrementWater = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/hydration/add',
                { cups: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Update water count
            setWater(response.data.cupsConsumed);
    
            // Add XP for hydration
            await axios.put(
                'http://localhost:5000/api/users/progress',
                { xp: 2 }, // Add 2 XP
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error incrementing water or updating XP:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="hydration-tracker-page">
            <h3>Hydration Tracker</h3>
            <p>Today's Water Intake: {water} cups</p>
            <button onClick={incrementWater}>Add 1 Cup</button>

            <div style={{ marginTop: '20px' }}>
                <h4>Hydration History</h4>
                <ul>
                    {hydrationHistory.map((record) => (
                        <li key={record.date}>
                            {record.date}: {record.cupsConsumed} cups
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HydrationTracker;
