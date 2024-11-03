const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Example endpoint for getting user data
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }]);
});

// Example endpoint for posting new data (e.g., user preferences)
app.post('/api/preferences', (req, res) => {
  console.log(req.body); // This is the data sent from the frontend
  res.status(201).send('Preference saved');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

app.get('/', (req, res) => {
    res.send('Welcome to the HealthQuest Backend API');
});

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


