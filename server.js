// server.js - Clean and minimal version

// 1. IMPORT LIBRARIES
const express = require('express');
require('dotenv').config();

// 2. CREATE EXPRESS APP AND MIDDLEWARE
const app = express();
const port = process.env.PORT || 5000;

// Import middleware
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const bodyParser = require('body-parser');

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
// If you want to restrict CORS to specific origins, replace the above line

// With this:
app.use(cors({
  origin: [
    'https://coursequest-lite-rust.vercel.app/',
    'http://localhost:5173'
  ],
  credentials: true
}));


// Add this before your routes in server.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 3. IMPORT ROUTES
const coursesRoutes = require('./routes/courses');
const ingestRoutes = require('./routes/ingest');
const compareRoutes = require('./routes/compare');
const askRoutes = require('./routes/ask');

// 4. USE ROUTES
app.use('/api/courses', coursesRoutes);
app.use('/api/ingest', ingestRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/ask', askRoutes);

// 5. ERROR HANDLING MIDDLEWARE (should be last)
app.use(errorHandler);

// 6. START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});