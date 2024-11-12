import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StepsTracker = () => {
    const [steps, setSteps] = useState(0);
    const [stepsInput, setStepsInput] = useState('');
    const [stepsHistory, setStepsHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStepsData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/steps/history', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSteps(response.data.today.steps);
                setStepsHistory(response.data.history);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching steps data:', error);
                setLoading(false);
            }
        };
        fetchStepsData();
    }, []);

    const handleAddSteps = async () => {
        const stepsToAdd = parseInt(stepsInput, 10);
        if (isNaN(stepsToAdd) || stepsToAdd <= 0) {
            alert('Please enter a valid number of steps.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/steps/add',
                { steps: stepsToAdd },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSteps(response.data.steps);
            setStepsInput('');
        } catch (error) {
            console.error('Error adding steps:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Steps Tracker</h3>
            <p>Today's Steps: {steps}</p>
            <input
                type="number"
                value={stepsInput}
                onChange={(e) => setStepsInput(e.target.value)}
                placeholder="Enter steps"
            />
            <button onClick={handleAddSteps}>Add Steps</button>

            <div style={{ marginTop: '20px' }}>
                <h4>Steps History</h4>
                <ul>
                    {stepsHistory.map((record) => (
                        <li key={record.date}>
                            {record.date}: {record.steps} steps
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StepsTracker;
