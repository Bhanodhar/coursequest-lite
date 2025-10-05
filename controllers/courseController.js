// controllers/courseController.js

const { queryCoursesWithFilters } = require('../utils/queryBuilder');

async function getCourses(req, res, next) {
  try {
    // Convert query parameters into a filters object
    const filters = {
      department: req.query.department,
      level: req.query.level,
      delivery_mode: req.query.delivery_mode,
      min_rating: req.query.min_rating ? parseFloat(req.query.min_rating) : undefined,
      max_rating: req.query.max_rating ? parseFloat(req.query.max_rating) : undefined,
      max_fee: req.query.max_fee ? parseInt(req.query.max_fee, 10) : undefined,
      credits: req.query.credits ? parseInt(req.query.credits, 10) : undefined,
    };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const courses = await queryCoursesWithFilters(filters, page, limit);
    res.json(courses);

  } catch (err) {
    next(err);
  }
}

module.exports = { getCourses };