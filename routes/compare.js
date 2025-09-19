// routes/compare.js

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res, next) => {
  // 1. Get the 'ids' parameter from the query string
  const idsString = req.query.ids;

  // 2. Check if the 'ids' parameter was provided
  if (!idsString) {
    return res.status(400).json({ error: 'Missing required parameter: ids' });
  }

  try {
    // 3. Split the comma-separated string into an array of numbers
    const idArray = idsString.split(',').map(id => parseInt(id, 10));

    // 4. Check if we have between 2 and 4 IDs
    if (idArray.length < 2 || idArray.length > 4) {
      console.log(`Comparison request with ${idArray.length} IDs. Suggested range is 2-4.`);
    }

    // 5. Build and execute the SQL query
    const queryString = 'SELECT * FROM courses WHERE course_id = ANY($1)';
    const result = await pool.query(queryString, [idArray]);

    // 6. Send the results back to the client
    res.json(result.rows);

  } catch (err) {
    next(err);
  }
});

module.exports = router;