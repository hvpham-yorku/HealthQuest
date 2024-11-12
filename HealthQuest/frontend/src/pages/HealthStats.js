import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const HealthStats = () => {
    const [hydrationData, setHydrationData] = useState([]);
    const [stepsData, setStepsData] = useState([]);
    const [caloriesData, setCaloriesData] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { hydration, steps, calories, dates } = response.data;

                setHydrationData(hydration);
                setStepsData(steps);
                setCaloriesData(calories);
                setLabels(dates);
            } catch (error) {
                console.error('Error fetching stats:', error.message);
            }
        };

        fetchStats();
    }, []);

    const createChartData = (data, label, color) => ({
        labels,
        datasets: [
            {
                label,
                data,
                borderColor: color,
                backgroundColor: `${color}50`,
                tension: 0.3,
            },
        ],
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Health Stats</h1>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h3>Hydration Over Time</h3>
                <Line data={createChartData(hydrationData, 'Cups of Water', 'blue')} />
            </div>
            <div style={{ width: '80%', margin: '20px auto' }}>
                <h3>Steps Over Time</h3>
                <Line data={createChartData(stepsData, 'Steps', 'green')} />
            </div>
            <div style={{ width: '80%', margin: '20px auto' }}>
                <h3>Calories Over Time</h3>
                <Line data={createChartData(caloriesData, 'Calories', 'red')} />
            </div>
        </div>
    );
};

export default HealthStats;
