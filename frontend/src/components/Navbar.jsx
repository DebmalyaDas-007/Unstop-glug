import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState('');
  const categories = ['coding', 'movies', 'sports', 'education', 'science', 'more'];
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate('/login');
  };
  const redirectToBrowseEvents=()=>{
    navigate('/browseEvents')
  }
  const redirectToHome=()=>{
    navigate('/')
  }

  useEffect(() => {
    if (category !== '') {
      try {
        navigate(`/category/${category}`);
      } catch (error) {
        console.log(error);
      }
    }
  }, [category, navigate]);

  return (
    <div className="navbar-container">
      <button className="logo">
        <h1>Fine<span>Stop</span></h1>
      </button>
      <div className="navbar-left">
        <button className="nav-button" onClick={redirectToHome}>Home</button>
        <button className="nav-button" onClick={redirectToBrowseEvents}>Browse Events</button>
        <button className="nav-button">Trending</button>
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="nav-button">Categories ▾</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="dropdown-item"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <button className="login-button" onClick={redirectToLoginPage}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
