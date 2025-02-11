// Progress.jsx
import React from 'react';
import './Progress.css';  // Стили для компонента

export default function Progress({ progress }) {
  return (
    <div className="progress-bar">
      <div
        className="progress-indicator"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
