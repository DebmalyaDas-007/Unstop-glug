import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/RegisterPopup.css';

const RegisterPopup = ({ children, event, maxTeams, teamSize, loggedIn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams()

const teamJoin=()=>{
  navigate(`/event/${id}/teams`);
}
  return (
    <div>
      <div onClick={() => setModalVisible(true)} style={{ display: 'inline-block' }}>
        {children}
      </div>

      {modalVisible && (
        <div className="register-popup-overlay">
          <div className="register-popup-box">
            <button className="register-close-btn" onClick={() => setModalVisible(false)}>
              &times;
            </button>

            {loggedIn ? (
              <div className="register-handle">
                <h2>Join a Team to participate</h2>
                <p>
                  {event} has a maximum team limit of {maxTeams} with a maximum of {teamSize} members per team.
                </p>
                <button type="submit" onClick={teamJoin}>Join a team</button>
                <button type="submit" onClick={()=>navigate(`/${id}/teams/create-team`)}>Create a team</button>
              </div>
            ) : (
              <div className="register-handle">
                <h2>User not logged in</h2>
                <p>Login to continue surfing!</p>
                <button type="button" onClick={() => navigate('/login')}>
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPopup;
