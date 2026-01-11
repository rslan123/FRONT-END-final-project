import React, { useState } from 'react';
import Uploader from './Uploader';
import './Uploader.css';

function App() {
  const [view, setView] = useState('uploader'); // Simple toggle for 'uploader' or 'about'

  return (
    <div className="playground-wrapper">
      {/* NAVIGATION BAR */}
      <nav className="navbar">
        <div className="nav-group">
          <span className="logo">AutoScale</span>
          <button className={`nav-btn ${view === 'uploader' ? 'active' : ''}`} onClick={() => setView('uploader')}>Uploader</button>
          <button className={`nav-btn ${view === 'about' ? 'active' : ''}`} onClick={() => setView('about')}>About</button>
          <button className="nav-btn">History</button> {/* Placeholder for future */}
        </div>
        
        <div className="nav-group">
          <span className="user-email">tester@example.com</span>
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <header className="page-header">
        <h1>{view === 'uploader' ? 'Media Pipeline' : 'System Overview'}</h1>
        <p>Frontend Design Playground</p>
      </header>

      {/* MAIN CONTENT */}
      <main className="content-area">
        {view === 'uploader' ? (
          <Uploader userRole="admin" user={{email: 'tester@example.com'}} />
        ) : (
          <div className="uploader-container">
            <h2>About the Pipeline</h2>
            <p>This section is for documentation and project details.</p>
            <div className="placeholder-box">Partner can design content here...</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;