import React from 'react';
import unstopLogo from '../assets/unstop.png'; 
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar-container">
      <button className="logo">
        <img className="unstop-logo" src={unstopLogo} alt="unstop logo" />
      </button>
      <div className="navbar-left">
        <button className="nav-button">Home</button>
        <button className="nav-button">Host Event</button>
        <button className="nav-button">Browse Events</button>
        <button className="nav-button">Categories</button>
      </div>
        <div className="navbar-right">
            <button className="login-button">Login</button>
            </div>
    </div>
  );
}

export default Navbar;

