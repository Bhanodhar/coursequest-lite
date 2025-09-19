// client/src/components/SearchPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Server contract (recommended): GET /api/courses?page=1&limit=10&department=... -> { results: [...], count: N }

const SearchPage = ({ addToComparison, comparisonList }) => {
  // STATE
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const [filters, setFilters] = useState({ department: '', level: '', delivery_mode: '', min_rating: '', max_fee: '' });
  const [departments, setDepartments] = useState([]);

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

  // Expect server to return either an object { results, count } or an array
      if (response.data && Array.isArray(response.data.results)) {
        setCourses(response.data.results);
        setTotalResults(Number(response.data.count) || response.data.results.length);
      } else if (Array.isArray(response.data)) {
        setCourses(response.data);
        setTotalResults(response.data.length);
      } else {
        setCourses([]);
        setTotalResults(0);
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError('Failed to fetch courses from server. Please ensure the backend is running.');
      console.error('Fetch error:', err);
      setCourses([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // client-side filtering/pagination helpers removed — data should come from backend

  useEffect(() => {
    fetchCourses(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch departments list from server (optional endpoint)
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/departments`);
      if (Array.isArray(res.data)) setDepartments(res.data);
    } catch (err) {
      console.warn('Failed to load departments from server', err);
      setDepartments([]);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handlers
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
    const maxPage = Math.max(1, Math.ceil(totalResults / itemsPerPage));
    if (newPage < 1 || newPage > maxPage) return;
    setCurrentPage(newPage);
    fetchCourses(newPage);
  };

  const isInComparisonList = useCallback((courseId) => comparisonList.some(c => c.course_id === courseId), [comparisonList]);

  const resetFilters = () => {
    setFilters({ department: '', level: '', delivery_mode: '', min_rating: '', max_fee: '' });
    setCurrentPage(1);
  };

  // Render
  return (
    <div className="container my-4">
      <h2 className="h4 mb-3">Search Courses</h2>

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-2 align-items-end" aria-label="Course filters">
            <div className="col-12 col-md-4">
              <label htmlFor="department" className="form-label">Department</label>
              <select id="department" name="department" value={filters.department} onChange={handleFilterChange} className="form-select">
                <option value="">All Departments</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label htmlFor="level" className="form-label">Level</label>
              <select id="level" name="level" value={filters.level} onChange={handleFilterChange} className="form-select" aria-label="Level">
                <option value="">All Levels</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label htmlFor="delivery_mode" className="form-label">Delivery Mode</label>
              <select id="delivery_mode" name="delivery_mode" value={filters.delivery_mode} onChange={handleFilterChange} className="form-select" aria-label="Delivery Mode">
                <option value="">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label htmlFor="min_rating" className="form-label">Min Rating</label>
              <input
                id="min_rating"
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
              <label htmlFor="max_fee" className="form-label">Max Fee (INR)</label>
              <input
                id="max_fee"
                type="number"
                name="max_fee"
                value={filters.max_fee}
                onChange={handleFilterChange}
                min="0"
                placeholder="e.g., 50000"
                className="form-control"
              />
            </div>

            <div className="col-12 text-end mt-1">
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
                <button type="submit" className="btn btn-primary btn-sm" aria-label="Apply filters">Apply Filters</button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { resetFilters(); fetchCourses(1); }}>Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {loading && (
          <div className="alert alert-info d-flex align-items-center" role="status">
            <div className="spinner-border spinner-border-sm text-info me-2" role="status" aria-hidden="true"></div>
            <div>Loading courses...</div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      {!loading && !error && (
        <div className="mb-2 text-muted">Found {courses.length} courses</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-3">
        {courses.map(course => (
          <div key={course.course_id} className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={course.course_name}>{course.course_name}</h5>
                <div className="mb-2 small text-muted">{course.department} · {course.level} · {course.delivery_mode}</div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="small">
                    <span className="fw-semibold">Rating:</span> <span className="text-warning">★{course.rating}</span>
                  </div>
                  <div className="small text-end">
                    <div><span className="fw-semibold">Fee:</span> ₹{course.tuition_fee_inr?.toLocaleString() || 'N/A'}</div>
                    <div><span className="fw-semibold">Credits:</span> {course.credits ?? '—'}</div>
                  </div>
                </div>

                <div className="mt-auto d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-center">
                  <small className="text-muted">Credits: {course.credits}</small>
                  <button
                    onClick={() => addToComparison(course)}
                    disabled={isInComparisonList(course.course_id)}
                    className="btn btn-outline-primary btn-sm w-100 w-sm-auto"
                    aria-pressed={isInComparisonList(course.course_id)}
                  >
                    {isInComparisonList(course.course_id) ? 'Added' : 'Add to Compare'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalResults > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-secondary btn-sm"
          >
            Previous
          </button>
          <span> Page {currentPage} of {Math.max(1, Math.ceil(totalResults / itemsPerPage))} </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalResults / itemsPerPage)}
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