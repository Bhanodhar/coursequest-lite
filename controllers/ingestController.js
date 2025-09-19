// controllers/ingestController.js

const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/database');

async function ingestData(req, res, next) {
  // 2. READ AND PARSE THE CSV FILE
  const results = [];

  // Create a read stream from the CSV file and pipe it through the csv-parser
  fs.createReadStream('data/courses.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      console.log(`CSV processing complete. Read ${results.length} rows.`);

      // 3. INSERT DATA INTO THE DATABASE
      const client = await pool.connect();

      try {
        await client.query('BEGIN');

        const insertQuery = `
          INSERT INTO courses (
            course_name, department, level, delivery_mode,
            credits, duration_weeks, rating, tuition_fee_inr, year_offered
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

        for (const course of results) {
          const values = [
            course.course_name,
            course.department,
            course.level,
            course.delivery_mode,
            parseInt(course.credits, 10),
            parseInt(course.duration_weeks, 10),
            parseFloat(course.rating),
            parseInt(course.tuition_fee_inr, 10),
            parseInt(course.year_offered, 10)
          ];
          await client.query(insertQuery, values);
        }

        await client.query('COMMIT');
        console.log('✅ All courses inserted successfully!');
        res.json({ message: `Successfully ingested ${results.length} courses into the database.` });

      } catch (err) {
        await client.query('ROLLBACK');
        next(err);
      } finally {
        client.release();
      }
    })
    .on('error', (err) => {
      next(err);
    });
}

module.exports = { ingestData };