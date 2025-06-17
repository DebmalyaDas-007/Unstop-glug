import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Crown, CalendarDays, User } from 'lucide-react';
import '../styles/MyTeams.css';
import { useContext } from 'react';
import { userContext } from '../contextAPI/UserContext';

const MyTeams = () => {
    const user = useContext(userContext);
    console.log(user);

    const [teamData, setTeamData] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/team/teams', {
                    withCredentials: true,
                });

                setTeamData(response.data.teams);
                setError(false);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        })();
    }, []);
    if (teamData.length === 0) {
        return (
            <div className="no-teams-message">
                <p>No teams available</p>
            </div>
        );
    }
    console.log(teamData);
    const teamDelete = async (EVENT_ID, TEAM_ID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this team?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/team/${EVENT_ID}/teams/${TEAM_ID}/delete`,
                { withCredentials: true }
            );
            console.log("Deleted:", response.data);
            setTeamData(prev => prev.filter(team => team._id !== TEAM_ID));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Something went wrong while deleting.");
        }
    };
    
    
    const renderConditionalDelete = (team,EVENT_ID,TEAM_ID) => {
        if (user && user._id === team.teamLeader._id) {
            return (
                <>
                <button className="delete" onClick={()=>{teamDelete(EVENT_ID,TEAM_ID)
                }}>Delete Team</button>
                <button className='manage'>Manage Team</button>
                </>
            )
        }
        return null
    }
    if (error) {
        return <div className="error-message">Error fetching team data. Please try again later.</div>;
    }

    return (
        
        <div className="teams-container">
           

            <h1 className="section-title"><Users size={24} /> Your Teams</h1>
            {teamData.map((team) => (
                <div key={team._id} className="team-card">
                    <h3 className="team-name">{team.name}</h3>

                    <h2 className="event-info">
                        <CalendarDays size={16} /> Event: {team.eventId.title} — {new Date(team.eventId.date).toLocaleDateString()}
                    </h2>

                    <p className="leader-info">
                        <Crown size={16} color="#facc15" />
                        <strong className="leader-name">{team.teamLeader.name}</strong> ({team.teamLeader.email})
                    </p>

                    <div className="members-section">
                        <strong><User size={14} /> Members:</strong>
                        <div className="members-grid">
                            {team.members.map((member) => (
                                <div key={member._id} className="member-box">
                                  {member.name} ({member.email})
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="teamDelete">
                        {renderConditionalDelete(team,team.eventId._id,team._id)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyTeams;
