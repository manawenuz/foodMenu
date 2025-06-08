const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Using promises version of fs
const initialFoodDataTemplate = require('./persistent_data_template'); // We'll create this next

const app = express();
const PORT = process.env.PORT || 3000;

// Path to the persisted data file
const PERSISTENT_DATA_DIR = path.join(__dirname, 'persistent_data');
const FOOD_DATA_PATH = path.join(PERSISTENT_DATA_DIR, 'foodData.json');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Middleware to parse JSON bodies

// Ensure persistent data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(PERSISTENT_DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating persistent data directory:', error);
  }
};

// Initialize foodData.json if it doesn't exist
const initializeFoodData = async () => {
  await ensureDataDir();
  try {
    await fs.access(FOOD_DATA_PATH);
    console.log('foodData.json found.');
  } catch (error) {
    // File doesn't exist, create it
    console.log('foodData.json not found, creating with initial data...');
    try {
      const initialData = initialFoodDataTemplate.getInitialFoodData();
      await fs.writeFile(FOOD_DATA_PATH, JSON.stringify(initialData, null, 2));
      console.log('foodData.json created successfully.');
    } catch (writeError) {
      console.error('Error writing initial foodData.json:', writeError);
    }
  }
};

// API endpoint to get food data
app.get('/api/food-data', async (req, res) => {
  try {
    const data = await fs.readFile(FOOD_DATA_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading foodData.json:', error);
    // If file doesn't exist after init (should not happen often), try to re-init or return error
    // For simplicity, returning error now. A robust solution might re-initialize.
    res.status(500).json({ error: 'Failed to read food data. Initialize might have failed.' });
  }
});

// API endpoint to update food data
app.post('/api/food-data', async (req, res) => {
  try {
    const newData = req.body;
    await fs.writeFile(FOOD_DATA_PATH, JSON.stringify(newData, null, 2));
    res.json({ message: 'Food data updated successfully' });
  } catch (error) {
    console.error('Error writing foodData.json:', error);
    res.status(500).json({ error: 'Failed to update food data' });
  }
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Initialize data and start server
initializeFoodData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Data will be persisted in: ${PERSISTENT_DATA_DIR}`);
  });
}).catch(err => {
    console.error("Failed to initialize and start server:", err);
}); 