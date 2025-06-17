import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Profile from '../components/Profile.jsx';
import LeftUserDashboard from '../components/LeftUserDashboard.jsx';
import '../styles/UserDashboard.css';
import { useContext } from 'react';
import { MainContext } from '../contextAPI';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Hackathons', value: 5 },
  { name: 'Quizzes', value: 3 },
  { name: 'Coding Events', value: 7 },
  { name: 'Workshops', value: 2 },
];
const COLORS = ['#a0a1eb', '#5355e6', '#0c0c757c', '#667eea'];

const CategoryCharts = () => {
  const {buttonTitle}=useContext(MainContext);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};
const renderItems=()=>{
  if(buttonTitle==='profile'){
    return(<Profile/>)
  }
}
function UserDashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <div className="sidebar">
          <LeftUserDashboard />
        </div>
        <div className="profile-section">
          <Profile />
          <div className="chart-section">
            
            <div className="chart-box">
              <CategoryCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
