import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Profile from '../components/Profile.jsx';
import LeftUserDashboard from '../components/LeftUserDashboard.jsx';
import '../styles/UserDashboard.css';
import { useContext } from 'react';
import { MainContext } from '../contextAPI';
import MyTeams from './MyTeams.jsx';
import EventCalendar from './EventCalendar.jsx';

const RenderItems = () => {
  const { buttonTitle } = useContext(MainContext);

  switch (buttonTitle) {
    case 'profile':
      return <Profile />;
    case 'viewteams':
      return <MyTeams />;
    // Add other cases here
    case 'eventcalendar':
      return <EventCalendar/>
    default:
      return <Profile />;
  }
};
function UserDashboard() {
  
  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <div className="sidebar">
          <LeftUserDashboard />
        </div>
        <div className="profile-section">
           {RenderItems()}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
