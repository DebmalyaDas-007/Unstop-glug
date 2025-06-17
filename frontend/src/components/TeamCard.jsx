import '../styles/TeamCard.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const TeamCard = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/team/${id}/teams`, {
          withCredentials: true,
        });
        setTeams(response.data.teams);
        setError('');
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [id]);

  const handleTeamView = (teamId) => {
    navigate(`/event/${id}/teams/${teamId}`);
  };

  return (
    <div className="teamcard-body">
      <Navbar />
      <div className="teamcard-header">
        <h1>Team Listings</h1>
      </div>

      {loading ? (
        <p className="teamcard-loading">Loading teams...</p>
      ) : error ? (
        <p className="teamcard-error">{error}</p>
      ) : (
        <div className="teamcard-list">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div key={index} className="teamcard-horizontal">
                <div className="teamcard-details">
                  <h3 className="teamcard-name">{team.name}</h3>
                  <p className="teamcard-members">Members: {team.members.length}</p>
                </div>
                <div className="teamcard-buttons">
                  <button onClick={() => handleTeamView(team._id)}>View Team</button>
                  <button onClick={() => handleTeamView(team._id)}>Join Team</button>
                </div>
              </div>
            ))
          ) : (
            <p className="teamcard-empty">No teams available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamCard;
