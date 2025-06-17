import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutPopup.css';
import axios from 'axios';
const LogoutPopup = ({ children, loggedIn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout =async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/logout', {}, {
            withCredentials: true, 
          });
    
        console.log(response);
        setModalVisible(false);
        alert('Logout succesful!')
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div>
      <div onClick={() => setModalVisible(true)} style={{ display: 'inline-block' }}>
        {children}
      </div>
        
      {modalVisible && (
        <div className="logout-popup-overlay">
          <div className="logout-popup-box">
            <p className="logout-popup-title">Are you sure you want to logout?</p>
            <div className="logout-popup-buttons">
              <button className="logout-cancel-btn" onClick={() => setModalVisible(false)}>Cancel</button>
              <button className="logout-confirm-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutPopup;
