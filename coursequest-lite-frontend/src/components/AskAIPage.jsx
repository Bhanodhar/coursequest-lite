import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


const AskAIPage = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await axios.post(`${API_BASE_URL}/api/ask`, { question: question.trim() });
      setResponse(result.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process your question. Please try again.');
      console.error('Ask AI error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    if (error) setError('');
  };

  const formatFilters = (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      return <div className="text-muted">No specific filters were identified in your question.</div>;
    }

    return Object.entries(filters).map(([key, value]) => (
      <span key={key} className="badge bg-secondary text-wrap me-1">{key.replace(/_/g, ' ')}: {String(value)}</span>
    ));
  };

  return (
    <div className="ask-ai-page">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ask AI About Courses</h5>
          <p className="card-text text-muted mb-3">Ask questions in plain English like: "Show me online computer science courses with rating above 4"</p>

          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-2">
              <textarea
                value={question}
                onChange={handleInputChange}
                placeholder="Type your question about courses here..."
                rows={3}
                disabled={loading}
                className="form-control"
              />
            </div>

            <button type="submit" disabled={loading || !question.trim()} className="btn btn-primary btn-sm">
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {error && <div className="alert alert-danger">⚠️ {error}</div>}

          {loading && <div className="alert alert-info">Analyzing your question and searching for courses...</div>}

          {response && (
            <div>
              <div className="mb-3">
                <h6>🤖 AI Interpretation</h6>
                <div className="text-muted">{response.interpretation}</div>
              </div>

              {response.filters && Object.keys(response.filters).length > 0 && (
                <div className="mb-3">
                  <h6>Parsed Filters:</h6>
                  <div className="d-flex flex-wrap gap-2">{formatFilters(response.filters)}</div>
                </div>
              )}

              <div>
                <h6>📚 Matching Courses ({response.count})</h6>
                {response.results.length === 0 ? (
                  <div className="alert alert-warning">No courses match your criteria. Try broadening your search.</div>
                ) : (
                  <div className="row row-cols-1 row-cols-md-2 g-3">
                    {response.results.map(course => (
                      <div key={course.course_id} className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="card-title">{course.course_name}</h6>
                            <p className="mb-1"><strong>Department:</strong> {course.department}</p>
                            <p className="mb-1"><strong>Level:</strong> {course.level}</p>
                            <p className="mb-1"><strong>Delivery:</strong> {course.delivery_mode}</p>
                            <p className="mb-1"><strong>Rating:</strong> ★{course.rating}</p>
                            <p className="mb-1"><strong>Fee:</strong> ₹{course.tuition_fee_inr?.toLocaleString()}</p>
                            <p className="mb-0"><strong>Credits:</strong> {course.credits}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskAIPage;