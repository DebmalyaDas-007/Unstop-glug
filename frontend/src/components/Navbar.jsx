import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Navbar() {
  const[dropdownOpen,setDropdownOpen]=useState(false);
  const categories = ['movies','coding','sports','education','science','tech','festival','quiz','more']
  const navigate = useNavigate();
  const redirectToLoginPage=()=>{

    navigate('/login');
  }
  return (
    <div className="navbar-container">
      <button className="logo">
        <h1>Fine<span>Stop</span></h1>
      </button>
      <div className="navbar-left">
        <button className="nav-button">Home</button>
        <button className="nav-button">Browse Events</button>
        <button className="nav-button">Trending</button>
        <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}>
            <button className="nav-button">Categories ▾</button>
             {dropdownOpen && (
            <div className="dropdown-menu">
              {categories.map((cat, i) => (
                <button key={i} className="dropdown-item">{cat}</button>
              ))}
            </div>
          )}
          </div>
      
        

      </div>
        <div className="navbar-right">
            <button className="login-button" onClick={redirectToLoginPage}>Login</button>
            </div>
    </div>
  );
}

export default Navbar;

