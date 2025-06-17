import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/ViewTeam.css';
import { User, Mail } from 'lucide-react';

const ViewTeam = () => {
  const { eventId, teamId } = useParams();
  
  const [team, setTeam] = useState({ members: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [req, setReq] = useState(false); // if request sent
  const [sending, setSending] = useState(false);
  const [application, setApplication] = useState({});
  const [isMember, setIsMember] = useState(false); // if user is already team member
  const [hasPendingRequest, setHasPendingRequest] = useState(false); // if user has pending join request
  const [joinError, setJoinError] = useState(null);

  // Fetch team data and check if user is member
  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/team/${eventId}/teams/${teamId}`,
          { withCredentials: true }
        );
        const teamData = response.data.team;
        setTeam(teamData);

        const currentUserId = response.data.currentUserId; 
        
        const member = teamData.members.find(m => m._id === currentUserId);
        setIsMember(!!member);
      } catch (err) {
        setError("Failed to load team data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [eventId, teamId]);


  const sendTeamReq = async () => {
    setSending(true);
    setJoinError(null);
    try {
      const teamReq = await axios.post(
        `http://localhost:3000/api/team/${eventId}/teams/${teamId}/request`,
        {},
        { withCredentials: true }
      );
      setApplication(teamReq.data);
      setReq(true);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send request.";
      setJoinError(message);
      console.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="view-team-wrapper">
        {loading && <p>Loading team details...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {req && application.message && (
          <p style={{ color: "green", marginTop: "10px", backgroundColor: "#E9FCF6" }}>
            ✅ {application.message}
          </p>
        )}

        <div className="teamName">
          <h1>{team.name}</h1>
        </div>
        <p className="team-info-summary">
          This team has {team.members.length} member{team.members.length !== 1 && 's'}
        </p>

        <div className="teamMemberContainer">
          {team.members.map(({ _id, name, email }) => (
            <div className="memberList" key={_id}>
              <h3><User size={16} /> {name}</h3>
              <p><Mail size={14} /> {email}</p>
            </div>
          ))}
        </div>

        {/* Disable button if user is member or already requested */}
        <button
          type="submit"
          className="joinBtn"
          onClick={sendTeamReq}
          disabled={isMember || hasPendingRequest || sending}
          title={
            isMember
              ? "You are already a member of this team"
              : hasPendingRequest
              ? "You have already requested to join this team"
              : undefined
          }
        >
          {isMember
            ? "Already a Member"
            : hasPendingRequest
            ? "Request Pending"
            : sending
            ? "Sending..."
            : "Request to Join"}
        </button>

        {joinError && <p style={{ color: 'red', marginTop: '10px' }}>{joinError}</p>}
      </div>
    </>
  );
};

export default ViewTeam;
