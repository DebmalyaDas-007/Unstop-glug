import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/MyRequests.css'; 
import {
  CalendarDays,
  FileText,
  Users,
  CircleDot,
  Loader2,
  AlertTriangle,
} from 'lucide-react'; 

const MyRequests = () => {
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/team/teamsRequested', {
          withCredentials: true,
        });
        setMyApps(response.data.teamApps);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="my-requests-container">
      <h2>My Team Applications</h2>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Loader2 className="spinner" />
          <span>Loading applications...</span>
        </div>
      ) : myApps.length === 0 ? (
        <div className="no-apps">
          <AlertTriangle size={20} />
          <span>No applications found.</span>
        </div>
      ) : (
        myApps.map((app, index) => (
          <div key={index} className="app-card">
            <h3>
              <CalendarDays size={18} /> Event: {app.event?.title || 'N/A'}
            </h3>
            <p>
              <FileText size={16} /> <strong>Description:</strong>{' '}
              {app.event?.description || 'N/A'}
            </p>
            <h4>
              <Users size={16} /> Team: {app.team?.name || 'N/A'}
            </h4>
            <p className={`status ${app.status}`}>
              <CircleDot size={14} /> Status:{' '}
              <span style={{ textTransform: 'capitalize' }}>{app.status}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
