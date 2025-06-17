import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EventPage.css';
import Cookies from 'js-cookie';
import { MapPin, Gift, Users, Layers, Trophy, CalendarDays } from 'lucide-react';
import RegisterPopup from '../components/RegisterPopup';

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const token=Cookies.get('access_token')
    const isLoggedIn=!!token;
    const navigate=useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/get/${id}`);
                setEvent(response.data.event);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
    const viewTeamControl=()=>{
        navigate(`/event/${id}/teams`)
    }
    const totalMembers = event.Teams
        ? event.Teams.reduce((acc, team) => acc + (team.members?.length || 0), 0)
        : 0;

    return (
        <div>
            <Navbar />
            <div className="event-page">
                <div className="event-image-container">
                    <img
                        src={event.coverImage || "https://picsum.photos/400/200"}
                        alt="Event"
                        className="event-image"
                    />

                    <div className="location">
                        <MapPin size={18} style={{ marginRight: 6 }} />
                        <h3>{event.location || "Mumbai, India"}</h3>
                    </div>

                    <div className="category">
                        <Layers size={18} style={{ marginRight: 6 }} />
                        <h3>{event.category || "General"}</h3>
                    </div>

                    <div className="prize">
                        <p><Gift size={16} style={{ marginRight: 4 }} /> win upto~</p>
                        <h3>₹{event.prizePool || '999'}</h3>
                    </div>

                    <div className="date">
                        <CalendarDays size={18} style={{ marginRight: 6 }} />
                        <h3>
                            {event.date
                                ? new Date(event.date).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : 'Date not announced'}
                        </h3>
                    </div>
                </div>

                                  <RegisterPopup
                                    event={event.title}
                                    maxTeams={event.maxTeams}
                                    teamSize={event.teamSize || 4}
                                    loggedIn={isLoggedIn}>
                                    <div className="register">
                                        <button>
                                            <Users size={18} style={{ marginRight: 8 }} />
                                            Register
                                        </button>
                                    </div>
                                  </RegisterPopup>
               

                <div className="title">
                    <h1>{event.title || "Event Title"}</h1>
                    <div className="info-card">
                        <span>
                            <h4>{event.Teams?.length || 0}</h4>
                            <p>Teams Registered</p>
                        </span>
                        <span>
                            <h4>{totalMembers}</h4>
                            <p>Total Members</p>
                        </span>
                        <span>
                            <h4>{event.maxTeams || 1}</h4>
                            <p>Max Team Size</p>
                        </span>
                        <span>
                            <h4>{event.maxRounds || 1}</h4>
                            <p>Maximum Rounds</p>
                        </span>
                    </div>
                </div>

                <div className="description">
                    <p>{event.description || "No description provided yet."}</p>
                </div>

                <div className="rounds">
                    <h1><Trophy size={20} style={{ marginRight: 8 }} />Rounds</h1>
                    {/* Display rounds  */}
                </div>
                <div className="viewTeams">
                    <button type='submit' className='Team-viewer' onClick={viewTeamControl}>View participating teams</button>
                </div>
            </div>
        </div>
    );
}

export default EventPage;
