// client/src/components/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This is the base URL for our backend API
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const SearchPage = ({ addToComparison, comparisonList }) => {
  // STATE
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    department: '',
    level: '',
    delivery_mode: '',
    min_rating: '',
    max_fee: ''
  });

  // FETCH
  const fetchCourses = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append('page', page);
      params.append('limit', itemsPerPage);

      const response = await axios.get(`${API_BASE_URL}/api/courses?${params}`);
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLERS
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    fetchCourses(newPage);
  };

  const isInComparisonList = (courseId) => comparisonList.some(c => c.course_id === courseId);

  // RENDER
  return (
    <div className="search-page">
      <h2 className="h4 mb-3">Search Courses</h2>

      <form onSubmit={handleSearch} className="row g-2 align-items-end mb-3">
        <div className="col-12 col-md-4">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            placeholder="e.g., Computer Science"
            className="form-control"
          />
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label">Level</label>
          <select name="level" value={filters.level} onChange={handleFilterChange} className="form-select">
            <option value="">All Levels</option>
            <option value="UG">Undergraduate (UG)</option>
            <option value="PG">Postgraduate (PG)</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label">Delivery Mode</label>
          <select name="delivery_mode" value={filters.delivery_mode} onChange={handleFilterChange} className="form-select">
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label">Min Rating</label>
          <input
            type="number"
            name="min_rating"
            value={filters.min_rating}
            onChange={handleFilterChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="0.0"
            className="form-control"
          />
        </div>

        <div className="col-6 col-md-2">
          <label className="form-label">Max Fee (INR)</label>
          <input
            type="number"
            name="max_fee"
            value={filters.max_fee}
            onChange={handleFilterChange}
            min="0"
            placeholder="e.g., 50000"
            className="form-control"
          />
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary btn-sm"
          onClick={handleSearch}
          >Apply Filters</button>
        </div>
      </form>

      {loading && <div className="alert alert-info">Loading courses...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="mb-2 text-muted">Found {courses.length} courses</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-3">
        {courses.map(course => (
          <div key={course.course_id} className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.course_name}</h5>
                <p className="card-text mb-1"><strong>Department:</strong> {course.department}</p>
                <p className="card-text mb-1"><strong>Level:</strong> {course.level}</p>
                <p className="card-text mb-1"><strong>Delivery:</strong> {course.delivery_mode}</p>
                <p className="card-text mb-1"><strong>Rating:</strong> ★{course.rating}</p>
                <p className="card-text mb-3"><strong>Fee:</strong> ₹{course.tuition_fee_inr?.toLocaleString()}</p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <small className="text-muted">Credits: {course.credits}</small>
                  <button
                    onClick={() => addToComparison(course)}
                    disabled={isInComparisonList(course.course_id)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    {isInComparisonList(course.course_id) ? 'Added' : 'Add to Compare'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary btn-sm"
          >
            Previous
          </button>
          <span> Page {currentPage} </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={courses.length < itemsPerPage}
            className="btn btn-secondary btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;