// createTable.js
require('dotenv').config();
const pool = require('./database');

async function createTable() {
  await pool.query(`
    CREATE TABLE courses (
      course_id SERIAL PRIMARY KEY,
      course_name VARCHAR(255) NOT NULL,
      department VARCHAR(100),
      level VARCHAR(2) CHECK (level IN ('UG', 'PG')),
      delivery_mode VARCHAR(10) CHECK (delivery_mode IN ('online', 'offline', 'hybrid')),
      credits INT,
      duration_weeks INT,
      rating NUMERIC(3,2),
      tuition_fee_inr INT,
      year_offered INT
    );

    CREATE INDEX idx_courses_department ON courses(department);
    CREATE INDEX idx_courses_level ON courses(level);
    CREATE INDEX idx_courses_delivery ON courses(delivery_mode);
    CREATE INDEX idx_courses_rating ON courses(rating);
    CREATE INDEX idx_courses_fee ON courses(tuition_fee_inr);
  `);

  console.log("✅ Table created");
  process.exit();
}

createTable();