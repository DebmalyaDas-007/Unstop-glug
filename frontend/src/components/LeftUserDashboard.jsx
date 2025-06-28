import React, { useContext } from 'react';
import { User, Users, ClipboardList, Calendar } from 'lucide-react';
import '../styles/LeftUserDashboard.css';
import { MainContext } from '../contextAPI/index.jsx';
import { userContext } from '../contextAPI/UserContext.jsx';

const LeftUserDashboard = () => {
  const { setButtonTitle } = useContext(MainContext);
  const userData = useContext(userContext);

  if (!userData || !userData.role) {
    return <div>loading...</div>;
  }

  if (userData.role === 'admin') {
    return (
      <div className="left-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <button className="dashboard-button" onClick={() => setButtonTitle("profile")}>
          <User size={18} /> Profile
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("manageevent")}>
          <Users size={18} /> Manage Events
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("hostevents")}>
          <ClipboardList size={18} /> Host Events
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("collaborations")}>
          <User size={18} /> Manage Collaborations
        </button>
      </div>
    );
  }

  if (userData.role === 'candidate') {
    return (
      <div className="left-dashboard">
        <h2 className="dashboard-title">User Dashboard</h2>
        <button className="dashboard-button" onClick={() => setButtonTitle("profile")}>
          <User size={18} /> Profile
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("viewteams")}>
          <Users size={18} /> View Teams
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("teamrequests")}>
          <ClipboardList size={18} /> Team Requests
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("myapplications")}>
          <User size={18} /> My Applications
        </button>
        <button className="dashboard-button" onClick={() => setButtonTitle("eventcalendar")}>
          <Calendar size={18} /> Event Calendar
        </button>
      </div>
    );
  }

  return <div>loading...</div>;
};

export default LeftUserDashboard;
