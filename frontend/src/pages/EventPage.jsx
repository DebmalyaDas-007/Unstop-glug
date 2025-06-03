import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/EventPage.css';
import { MapPin, Gift, Users, Layers, Trophy, CalendarDays } from 'lucide-react';

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState({});

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

                <div className="register">
                    <button>
                        <Users size={18} style={{ marginRight: 8 }} />
                        Register
                    </button>
                </div>

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
                    {/* Display rounds here if needed */}
                </div>
            </div>
        </div>
    );
}

export default EventPage;
