import React from 'react';
import { User, Users, ClipboardList, Calendar } from 'lucide-react';
import '../styles/LeftUserDashboard.css';
import { useContext } from 'react';
import { MainContext } from '../contextAPI/index.jsx';
const LeftUserDashboard = () => {
  const { setButtonTitle } = useContext(MainContext);
  return (
    <div className="left-dashboard">
      <h2 className="dashboard-title">User Dashboard</h2>
      <button className="dashboard-button" onClick={()=>setButtonTitle("profile")}>
        <User size={18} /> Profile
      </button>
      <button className="dashboard-button" onClick={()=>setButtonTitle("viewteams")}>
        <Users size={18} /> View Teams
      </button>
      <button className="dashboard-button" onClick={()=>setButtonTitle("teamrequests")}>
        <ClipboardList size={18} /> Team Requests
      </button>
      <button className="dashboard-button" onClick={()=>setButtonTitle("myapplications")}>
        <User size={18} /> My Applications
      </button>
      <button className="dashboard-button" onClick={()=>setButtonTitle("eventcalendar")}>
        <Calendar size={18} /> Event Calendar
      </button>
    </div>
  );
};

export default LeftUserDashboard;
