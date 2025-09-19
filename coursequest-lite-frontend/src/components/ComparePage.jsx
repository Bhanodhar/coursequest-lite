// client/src/components/ComparePage.jsx
import React from 'react';

// Using Bootstrap utility classes for layout and styling
const ComparePage = ({ comparisonList, removeFromComparison, clearComparison }) => {
  // If no courses are selected for comparison, show a message
  if (!comparisonList || comparisonList.length === 0) {
    return (
      <div className="container my-5">
        <div className="card">
          <div className="card-body text-center py-5">
            <h4 className="mb-2">Compare Courses</h4>
            <p className="text-muted mb-3">No courses selected for comparison. Go to the Search tab and add some courses.</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-sm" disabled>Go to Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const comparisonFields = [
    { key: 'course_name', label: 'Course Name' },
    { key: 'department', label: 'Department' },
    { key: 'level', label: 'Level' },
    { key: 'delivery_mode', label: 'Delivery Mode' },
    { key: 'credits', label: 'Credits' },
    { key: 'duration_weeks', label: 'Duration (Weeks)' },
    { key: 'rating', label: 'Rating', format: (v) => `★ ${v}` },
    { key: 'tuition_fee_inr', label: 'Fee (INR)', format: (v) => `₹${v?.toLocaleString()}` },
    { key: 'year_offered', label: 'Year Offered' }
  ];

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-0">Compare Courses <small className="text-muted">({comparisonList.length})</small></h5>
              <small className="text-muted">Compare key properties side-by-side</small>
            </div>

            <div>
              <button
                onClick={clearComparison}
                className="btn btn-outline-danger btn-sm"
                aria-label="Clear all courses from comparison"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="table-responsive mb-3" role="region" aria-label="Course comparison table">
            <table className="table table-striped table-bordered table-sm align-middle"> 
              <thead className="table-light">
                <tr>
                  <th scope="col">Property</th>
                  {comparisonList.map(course => (
                    <th key={course.course_id} className="align-middle text-start" scope="col">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="me-2">
                          <h6 className="mb-1 text-truncate" title={course.course_name}>{course.course_name}</h6>
                          <small className="text-muted">{course.department}</small>
                        </div>
                        <button
                          onClick={() => removeFromComparison(course.course_id)}
                          className="btn btn-sm btn-outline-secondary ms-2"
                          aria-label={`Remove ${course.course_name} from comparison`}
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map(field => (
                  <tr key={field.key}>
                    <td className="fw-semibold" style={{ minWidth: 160 }}>{field.label}</td>
                    {comparisonList.map(course => (
                      <td key={`${course.course_id}-${field.key}`}>
                        {field.format ? field.format(course[field.key]) : (course[field.key] ?? 'N/A')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {comparisonList.length > 1 && (
            <div>
              <h6 className="mb-2">Quick Comparison</h6>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">★ Highest Rated</h6>
                      <p className="card-text mb-0 small">{comparisonList.reduce((best, current) => (current.rating > best.rating ? current : best), comparisonList[0]).course_name}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">💰 Most Affordable</h6>
                      <p className="card-text mb-0 small">{comparisonList.reduce((best, current) => (current.tuition_fee_inr < best.tuition_fee_inr ? current : best), comparisonList[0]).course_name}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">📚 Most Credits</h6>
                      <p className="card-text mb-0 small">{comparisonList.reduce((best, current) => (current.credits > best.credits ? current : best), comparisonList[0]).course_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;