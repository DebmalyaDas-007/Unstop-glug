import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from "lucide-react";
import Cookies from 'js-cookie';
import userProfilePic from '../assets/profile.svg';
import LogoutPopup from './LogoutPopup.jsx';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarDropdown,setAvatarDropdown]=useState(false);
  console.log(avatarDropdown);
  
  const [category, setCategory] = useState('');
  const categories = ['coding', 'movies', 'sports', 'education', 'science', 'more'];
  const navigate = useNavigate();
   const token=Cookies.get('access_token')
      const isLoggedIn=!!token;
      
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

  const toDashboard=()=>{
    const role='user'
    if(role==='admin'){
      navigate('/admin-dashboard')
    }
    else{
      navigate('/user-dashboard')
    }
  }

  const AvatarClick = () => {
    if (avatarDropdown) {
      return (
        <div className="avatar-dropdown">
          <button className="dashboard-btn" onClick={toDashboard}>
            <LayoutDashboard size={18} style={{ marginRight: "8px" }} />
            Dashboard
          </button>
          <LogoutPopup  loggedIn={isLoggedIn}>
          <button className="logout-btn">
            <LogOut size={18} style={{ marginRight: "8px" }} />
            Logout
          </button>
          </LogoutPopup>
          
        </div>
      );
    }
    return null;
  };
  
  const ConditionalRender=()=>{
    if(!isLoggedIn){
      return(
         
        <button className="login-button" onClick={redirectToLoginPage}>
          Login
        </button>
      )
    }
    return(
      <>
      <div className="avatar" onClick={()=>{setAvatarDropdown(!avatarDropdown)}}>
      <img src={userProfilePic} alt="User Avatar" />

      </div>
      <div className="avatarClick">
        <AvatarClick/>
      </div>
      </>
    )
  }
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
       <ConditionalRender/>
      </div>
    </div>
  );
}

export default Navbar;
