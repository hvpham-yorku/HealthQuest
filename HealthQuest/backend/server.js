const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const progressRoutes = require('./src/routes/progressRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/users', progressRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => res.send('Welcome to the HealthQuest Backend API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
