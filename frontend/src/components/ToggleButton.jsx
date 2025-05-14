import React, { useState } from 'react';
import '../styles/ToggleButton.css';

function ToggleButton({ onSelect }) {
  const [activeRole, setActiveRole] = useState('');

  const handleToggle = (role) => {
    setActiveRole(role);
    onSelect?.(role);
  };

  return (
    <div className="toggle-button-container">
      <button
        className={`toggle-btn ${activeRole === 'Candidate' ? 'active' : ''}`}
        onClick={() => handleToggle('Candidate')}
      >
        As Candidate
      </button>
      <button
        className={`toggle-btn ${activeRole === 'Admin' ? 'active' : ''}`}
        onClick={() => handleToggle('Admin')}
      >
        As Admin
      </button>
    </div>
  );
}

export default ToggleButton;
