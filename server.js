const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'HealthQuest', 'frontend', 'build')));

// Catch-all handler to serve React's index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'HealthQuest', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
