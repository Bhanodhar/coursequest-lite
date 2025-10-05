// utils/queryBuilder.js

const pool = require('../config/database');

async function queryCoursesWithFilters(filters = {}, page = 1, limit = 10) {
  let queryParts = [];
  let queryParams = [];
  let paramCounter = 1;

  // Process all the possible filters from the filters object
  if (filters.department) {
    queryParts.push(`department = $${paramCounter}`);
    queryParams.push(filters.department);
    paramCounter++;
  }
  if (filters.level) {
    queryParts.push(`level = $${paramCounter}`);
    queryParams.push(filters.level);
    paramCounter++;
  }
  if (filters.delivery_mode) {
    queryParts.push(`delivery_mode = $${paramCounter}`);
    queryParams.push(filters.delivery_mode);
    paramCounter++;
  }
  if (filters.min_rating) {
    queryParts.push(`rating >= $${paramCounter}`);
    queryParams.push(filters.min_rating);
    paramCounter++;
  }
  if (filters.max_rating) {
    queryParts.push(`rating <= $${paramCounter}`);
    queryParams.push(filters.max_rating);
    paramCounter++;
  }
  if (filters.max_fee) {
    queryParts.push(`tuition_fee_inr <= $${paramCounter}`);
    queryParams.push(filters.max_fee);
    paramCounter++;
  }
  if (filters.credits) {
    queryParts.push(`credits = $${paramCounter}`);
    queryParams.push(filters.credits);
    paramCounter++;
  }

  // Calculate pagination
  const offset = (page - 1) * limit;
  // Build the final query string
  let queryString = 'SELECT * FROM courses';
  if (queryParts.length > 0) {
    queryString += ' WHERE ' + queryParts.join(' AND ');
  }
  queryString += ` ORDER BY course_id LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
  queryParams.push(limit, offset);

  // Execute the query
  const result = await pool.query(queryString, queryParams);
  return result.rows;
}

module.exports = { queryCoursesWithFilters };