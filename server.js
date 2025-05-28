const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve the data directory
app.use('/data', express.static(path.join(__dirname, 'data')));

// API endpoint to update food availability
app.post('/api/updateAvailability', async (req, res) => {
  try {
    const data = req.body;
    await fs.writeFile(
      path.join(__dirname, 'data', 'foodAvailability.json'),
      JSON.stringify(data, null, 2)
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving food availability:', error);
    res.status(500).json({ error: 'Failed to save food availability' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 