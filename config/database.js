// config/database.js

const { Pool } = require('pg');

console.log("Attempting to connect with URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Add error handling for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Test the connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to the PostgreSQL database successfully!');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('Full error object:', err);
  }
})();

module.exports = pool;