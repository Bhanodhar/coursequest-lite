// client/src/App.js
import React, { useState } from 'react';
// Using Bootstrap for layout and styling; removed App.css import
// We will create these components in the next steps
import SearchPage from './components/SearchPage';
import ComparePage from './components/ComparePage';
import AskAIPage from './components/AskAIPage';

function App() {
  // State to track the active tab: 'search', 'compare', or 'ask'
  const [activeTab, setActiveTab] = useState('search');
  // State to store the list of courses selected for comparison
  const [comparisonList, setComparisonList] = useState([]);

  // Function to add a course to the comparison list
  const addToComparison = (course) => {
    // Prevent adding the same course twice and limit to 4 courses
    if (!comparisonList.find(c => c.course_id === course.course_id) && comparisonList.length < 4) {
      setComparisonList([...comparisonList, course]);
    }
  };

  // Function to remove a course from the comparison list
  const removeFromComparison = (courseId) => {
    setComparisonList(comparisonList.filter(course => course.course_id !== courseId));
  };

  // Function to clear the entire comparison list
  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <div className="App">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="brand">
            <h1 className="h3 mb-0">CourseQuest Lite</h1>
            <p className="mb-0 small">Find and compare courses quickly</p>
          </div>

          <nav className="btn-group mt-3 mt-md-0" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => setActiveTab('search')}
              className={`btn btn-light btn-sm ${activeTab === 'search' ? 'active' : ''}`}
              aria-pressed={activeTab === 'search'}
            >
              <i className="bi bi-search me-1" /> Search
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`btn btn-light btn-sm position-relative ${activeTab === 'compare' ? 'active' : ''}`}
              aria-pressed={activeTab === 'compare'}
            >
              <i className="bi bi-list-ul me-1" /> Compare
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {comparisonList.length}
                <span className="visually-hidden">items in comparison</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ask')}
              className={`btn btn-light btn-sm ${activeTab === 'ask' ? 'active' : ''}`}
              aria-pressed={activeTab === 'ask'}
            >
              <i className="bi bi-robot me-1" /> Ask AI
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          {/* Conditionally render the active tab's component */}
          {activeTab === 'search' && (
            <SearchPage
              addToComparison={addToComparison}
              comparisonList={comparisonList}
            />
          )}
          {activeTab === 'compare' && (
            <ComparePage
              comparisonList={comparisonList}
              removeFromComparison={removeFromComparison}
              clearComparison={clearComparison}
            />
          )}
          {activeTab === 'ask' && <AskAIPage />}
        </div>
      </main>
    </div>
  );
}

export default App;