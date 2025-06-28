import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Profile from '../components/Profile.jsx';
import LeftUserDashboard from '../components/LeftUserDashboard.jsx';
import '../styles/UserDashboard.css';
import { useContext } from 'react';
import { MainContext } from '../contextAPI';
import MyTeams from './MyTeams.jsx';
import EventCalendar from './EventCalendar.jsx';
import MyApplications from '../components/MyApplications.jsx';
import MyRequests from '../components/MyRequests.jsx';
import HostEvents from '../components/HostEvents.jsx';
import ManageAdminEvents from '../components/ManageAdminEvents.jsx';

const RenderItems = () => {
  const { buttonTitle } = useContext(MainContext);

  switch (buttonTitle) {
    case 'profile':
      return <Profile />;
    case 'viewteams':
      return <MyTeams />;
    case 'myapplications':
      return <MyRequests/>
    case 'teamrequests':
      return <MyApplications/>
    case 'eventcalendar':
      return <EventCalendar/>
      case 'hostevents':
        return <HostEvents/>
    case 'manageevent':
      return <ManageAdminEvents/>
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
