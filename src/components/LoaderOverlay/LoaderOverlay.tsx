import React from 'react';
import './LoaderOverlay.css';

const LoaderOverlay: React.FC = () => {
  return (
    <div className="component-loader-overlay">
      <div className="loader-content">
        <div className="spinner"></div>
        <p className="loading-text">Loading…</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
