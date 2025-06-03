import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BrowseEvents.css';
import Navbar from '../components/Navbar';
import ModernEventCard from '../components/ModernEventCard.jsx';
import { Link } from 'react-router-dom';

const BrowseEvents = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/event/get');
                setEvents(response.data.events);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        })();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            {events.length === 0 ? (
                <div><h2>No events available</h2></div>
            ) : (
                <div className="events-container">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Search for available events"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="events-grid">
                        {filteredEvents.map((event) => {
                            const dateObj = new Date(event.date);
                            const day = dateObj.getDate().toString().padStart(2, '0');
                            const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

                            return (
                                <Link to={`/event/${event._id}`} key={event._id} style={{ textDecoration: 'none' }}>
                                    <ModernEventCard
                                        title={event.title}
                                        description={event.description}
                                        Location={event.location || "Not specified"}
                                        day={day}
                                        month={month}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseEvents;
