// middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Database connection error
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ 
      error: 'Service unavailable', 
      message: 'Database connection failed' 
    });
  }

  // PostgreSQL errors
  if (err.code && err.code.startsWith('22') || err.code.startsWith('23')) {
    return res.status(400).json({ 
      error: 'Database error', 
      message: 'Invalid data provided' 
    });
  }

  // Default error
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message 
  });
}

module.exports = { errorHandler };