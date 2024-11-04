import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

function Dashboard() {
    const [users, setUsers] = useState([]);

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
        <div>
            <h2>Dashboard</h2>
            <h3>User List:</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
