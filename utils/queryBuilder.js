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
  // Build the WHERE clause once so we can use it for both the count and the paged query
  const whereClause = queryParts.length > 0 ? ' WHERE ' + queryParts.join(' AND ') : '';

  // Get total count for the filters (so frontend can compute total pages)
  const countQuery = 'SELECT COUNT(*)::int AS count FROM courses' + whereClause;
  const countResult = await pool.query(countQuery, queryParams);
  const totalCount = (countResult.rows[0] && countResult.rows[0].count) || 0;

  // Calculate pagination
  const offset = (page - 1) * limit;
  // Build the final query string for paged results
  let queryString = 'SELECT * FROM courses' + whereClause;
  queryString += ` ORDER BY course_id LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
  queryParams.push(limit, offset);

  // Execute the paged query
  const result = await pool.query(queryString, queryParams);
  return { results: result.rows, count: totalCount };
}

module.exports = { queryCoursesWithFilters };