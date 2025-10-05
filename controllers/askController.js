// controllers/askController.js

const { parseQuestion } = require('../utils/questionParser');
const { queryCoursesWithFilters } = require('../utils/queryBuilder');

async function askQuestion(req, res, next) {
  try {
    // 1. Get the question from the request body
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Missing required field: question' });
    }

    // 2. Parse the question using our rule-based function
    const parsedFilters = parseQuestion(question);

    // 3. Use the parsed filters to query the database
    const courses = await queryCoursesWithFilters(parsedFilters, 1, 20);

    // 4. Format the response
    const response = {
      interpretation: `We found courses for: ${Object.entries(parsedFilters).map(([key, value]) => `${key}: ${value}`).join(', ') || 'No specific filters parsed'}`,
      filters: parsedFilters,
      results: courses,
      count: courses.length
    };

    // 5. If no results were found, still send a 200 OK
    if (courses.length === 0) {
      response.interpretation = "No matching courses found based on your question. Try adjusting your criteria.";
    }

    res.json(response);

  } catch (err) {
    next(err);
  }
}

module.exports = { askQuestion };