// client/src/components/ComparePage.jsx
import React from 'react';

// Using Bootstrap for styling
const ComparePage = ({ comparisonList, removeFromComparison, clearComparison }) => {
  // If no courses are selected for comparison, show a message
  if (!comparisonList || comparisonList.length === 0) {
    return (
      <div className="compare-page">
        <div className="text-center py-5">
          <h4 className="mb-2">Compare Courses</h4>
          <p className="text-muted">No courses selected for comparison. Go to the Search tab and add some courses.</p>
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
    <div className="compare-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Compare Courses ({comparisonList.length})</h2>
        <button
          onClick={clearComparison}
          className="btn btn-outline-danger btn-sm"
          aria-label="Clear all courses from comparison"
        >
          Clear All
        </button>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Property</th>
              {comparisonList.map(course => (
                <th key={course.course_id} className="align-middle text-start">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">{course.course_name}</h6>
                      <small className="text-muted">{course.department}</small>
                    </div>
                    <button
                      onClick={() => removeFromComparison(course.course_id)}
                      className="btn btn-sm btn-outline-secondary ms-2"
                      aria-label={`Remove ${course.course_name} from comparison`}
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map(field => (
              <tr key={field.key}>
                <td><strong>{field.label}</strong></td>
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
          <h6>Quick Comparison</h6>
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">★ Highest Rated</h6>
                  <p className="card-text mb-0">{comparisonList.reduce((best, current) => (current.rating > best.rating ? current : best), comparisonList[0]).course_name}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">💰 Most Affordable</h6>
                  <p className="card-text mb-0">{comparisonList.reduce((best, current) => (current.tuition_fee_inr < best.tuition_fee_inr ? current : best), comparisonList[0]).course_name}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">📚 Most Credits</h6>
                  <p className="card-text mb-0">{comparisonList.reduce((best, current) => (current.credits > best.credits ? current : best), comparisonList[0]).course_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;