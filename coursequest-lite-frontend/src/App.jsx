import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import ComparePage from './components/ComparePage';
import AskAIPage from './components/AskAIPage';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [comparisonList, setComparisonList] = useState([]);
  const addToComparison = (course) => {
    if (!comparisonList.find(c => c.course_id === course.course_id) && comparisonList.length < 4) {
      setComparisonList([...comparisonList, course]);
    }
  };

  const removeFromComparison = (courseId) => {
    setComparisonList(comparisonList.filter(course => course.course_id !== courseId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <div className="App">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <h1 className="h4 mb-0">CourseQuest Lite</h1>
              <small className="d-block">Find and compare courses quickly</small>
            </div>
          </div>

          <nav className="nav nav-pills" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => setActiveTab('search')}
              className={`btn btn-sm btn-outline-light me-2 ${activeTab === 'search' ? 'active' : ''}`}
              aria-pressed={activeTab === 'search'}
            >
              <i className="bi bi-search me-1" />
              Search
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`btn btn-sm btn-outline-light me-2 ${activeTab === 'compare' ? 'active' : ''}`}
              aria-pressed={activeTab === 'compare'}
            >
              <i className="bi bi-list-ul me-1" />
              Compare
              <span className="badge bg-danger ms-2">{comparisonList.length}</span>
              <span className="visually-hidden">items in comparison</span>
            </button>

            <button
              onClick={() => setActiveTab('ask')}
              className={`btn btn-sm btn-outline-light ${activeTab === 'ask' ? 'active' : ''}`}
              aria-pressed={activeTab === 'ask'}
            >
              <i className="bi bi-robot me-1" />
              Ask AI
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          {activeTab === 'search' && (
            <SearchPage addToComparison={addToComparison} comparisonList={comparisonList} />
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