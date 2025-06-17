import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/TeamCreate.css';

const TeamCreate = () => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { id } = useParams();

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const createTeam = async () => {
    if (!teamName.trim()) {
      setMessage({ type: 'error', text: 'Team name cannot be empty.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/team/${id}/teams/create-team`,
        { TeamName: teamName },
        { withCredentials: true }
      );
      setMessage({ type: 'success', text: response.data.message || 'Team created successfully!' });
      setTeamName('');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="teamContainer">
        <h1>Create your own team!</h1>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          className="team-name"
          placeholder="Enter team name"
          value={teamName}
          onChange={handleTeamName}
        />

        <button
          className="team-create-btn"
          onClick={createTeam}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </div>
    </div>
  );
};

export default TeamCreate;
