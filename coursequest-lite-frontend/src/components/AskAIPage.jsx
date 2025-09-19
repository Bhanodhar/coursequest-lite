import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

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
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-1">Ask AI About Courses</h3>
              <p className="text-muted small mb-3">Ask in plain English — e.g. "Show online computer science courses with rating above 4"</p>

              <form onSubmit={handleSubmit} className="mb-3" aria-labelledby="ask-ai-form">
                <label htmlFor="question" className="form-label small mb-1">Your question</label>
                <textarea
                  id="question"
                  value={question}
                  onChange={handleInputChange}
                  placeholder="Type your question about courses here..."
                  rows={5}
                  disabled={loading}
                  className="form-control mb-2"
                  aria-label="Question about courses"
                />

                <div className="mb-2 small text-muted">Tip: Be specific about delivery mode, rating, or price to get better results.</div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="btn btn-primary w-100 w-sm-auto"
                    aria-disabled={loading || !question.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Thinking...
                      </>
                    ) : (
                      'Ask AI'
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 w-sm-auto"
                    onClick={() => { setQuestion(''); setResponse(null); setError(''); }}
                    disabled={Boolean(loading)}
                  >
                    Clear
                  </button>
                </div>
              </form>

              {error && <div className="alert alert-danger mt-2" role="alert">⚠️ {error}</div>}

              <div aria-live="polite" aria-atomic="true">
                {loading && (
                  <div className="alert alert-info d-flex align-items-center" role="status">
                    <div className="spinner-border text-info me-2" role="status" aria-hidden="true"></div>
                    <div>Analyzing your question and searching for courses...</div>
                  </div>
                )}
              </div>

              {response && (
                <section className="mt-3" aria-labelledby="ai-interpretation">
                  <div className="mb-3">
                    <h5 id="ai-interpretation" className="mb-1">🤖 AI Interpretation</h5>
                    <p className="text-muted mb-0 small">{response.interpretation || 'No interpretation provided.'}</p>
                  </div>

                  {response.filters && Object.keys(response.filters).length > 0 && (
                    <div className="mb-3">
                      <h6 className="mb-1">Parsed Filters</h6>
                      <div className="d-flex flex-wrap">{formatFilters(response.filters)}</div>
                    </div>
                  )}

                  <div>
                    <h6 className="mb-2">📚 Matching Courses <small className="text-muted">({response.count})</small></h6>
                    {response.results.length === 0 ? (
                      <div className="alert alert-warning">No courses match your criteria. Try broadening your search.</div>
                    ) : (
                      <div className="row row-cols-1 row-cols-md-2 g-3">
                        {response.results.map(course => (
                          <div key={course.course_id} className="col">
                            <article className="card h-100">
                              <div className="card-body">
                                <h6 className="card-title mb-1 text-truncate" title={course.course_name}>{course.course_name}</h6>
                                <div className="mb-2 small text-muted">{course.department} · {course.level} · {course.delivery_mode}</div>

                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="small">
                                    <span className="fw-semibold">Rating:</span> <span className="text-warning">★{course.rating}</span>
                                  </div>
                                  <div className="small text-end">
                                    <div><span className="fw-semibold">Fee:</span> ₹{course.tuition_fee_inr?.toLocaleString() || 'N/A'}</div>
                                    <div><span className="fw-semibold">Credits:</span> {course.credits ?? '—'}</div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIPage;