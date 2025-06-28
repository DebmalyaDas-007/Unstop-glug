import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Clock, Users, Calendar, Edit3, Trash2, ArrowLeft } from 'lucide-react';
import '../styles/ManageAdminEvents.css';

const ManageAdminEvents = () => {
    const [AdminEvents, setAdminEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [event, setEvent] = useState({});
    const [portal, setPortal] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/event/getAdminEvents', {
                    withCredentials: true
                });
                setAdminEvents(response.data.events);
                setError(null);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch events. Please try again.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleManageEvent = async (Id) => {

        const response = await axios.get(`http://localhost:3000/api/event/get/${Id}`)
        console.log('Managing event:', Id);
        setEvent(response.data.event);
        setPortal(true)

    };
    const RenderConditional = () => {
        if (!portal) {
            return (
                <>
                    <div className="admin-events-container">
                        <div className="admin-events-wrapper">
                            {/* Header */}
                            <div className="admin-events-header">
                                <h1 className="admin-events-title">Event Management</h1>
                                <p className="admin-events-subtitle">Manage and monitor your events</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            {/* Events Grid */}
                            {AdminEvents.length === 0 ? (
                                <div className="no-events">
                                    <h2 className="no-events-title">No Events Found</h2>
                                    <p>You haven't created any events yet.</p>
                                </div>
                            ) : (
                                <div className="events-grid">
                                    {AdminEvents.map((event) => (
                                        <div key={event._id} className="event-card">
                                            {/* Cover Image */}
                                            <div className="event-cover">
                                                {event.coverImage ? (
                                                    <img
                                                        src={event.coverImage}
                                                        alt={event.title}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div className="event-cover-fallback" style={{ display: event.coverImage ? 'none' : 'flex' }}>
                                                    <Calendar size={48} color="white" />
                                                </div>

                                                {/* Category Badge */}
                                                {event.category && (
                                                    <div className={`category-badge ${getCategoryClass(event.category)}`}>
                                                        {event.category}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="event-content">
                                                {/* Title */}
                                                <h3 className="event-title">{event.title}</h3>

                                                {/* Event Details */}
                                                <div className="event-details">
                                                    {event.location && (
                                                        <div className="event-detail-item">
                                                            <MapPin className="event-detail-icon" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    )}

                                                    <div className="event-detail-item">
                                                        <Clock className="event-detail-icon" />
                                                        <span>Date: {formatDate(event.createdAt)}</span>
                                                    </div>

                                                    {event.maxTeams && (
                                                        <div className="event-detail-item">
                                                            <Users className="event-detail-icon" />
                                                            <span>Max Teams: {event.maxTeams}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Stats Row */}
                                                <div className="event-stats">
                                                    {event.maxRounds && (
                                                        <div className="stat-item stat-rounds">
                                                            <div className="stat-value">{event.maxRounds}</div>
                                                            <div className="stat-label">Rounds</div>
                                                        </div>
                                                    )}
                                                    {event.prizePool && (
                                                        <div className="stat-item stat-prize">
                                                            <div className="stat-value">₹{event.prizePool.toLocaleString()}</div>
                                                            <div className="stat-label">Prize Pool</div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="event-actions">
                                                    <button
                                                        className="btn btn-manage"
                                                        onClick={() => handleManageEvent(event._id)}
                                                    >
                                                        <Edit3 className="btn-icon" />
                                                        Manage Event
                                                    </button>
                                                    <button
                                                        className="btn btn-delete"
                                                        onClick={() => handleDeleteEvent(event._id)}
                                                    >
                                                        <Trash2 className="btn-icon" />
                                                        Delete Event
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <div className='event-manage-container'>
                    <div className="event-manage-nav">
                        <div className="back-to-manage">
                            <button className="back-manage" onClick={() => setPortal(false)}>
                                <ArrowLeft size={25} />
                                
                            </button>

                        </div>
                        
                        <div className="admin-event-title">
                            
                            <h1 className='box-titler'>{event.title}</h1>
                            
                        </div>
                    </div>
                    <div className="event-monitor">
                        <div className="detail-boxes">
                        <div className="event-detail-box">
                            <h1>{event.Teams.length}</h1>
                            <p className='box-subheader'>teams participated</p>
                        </div>
                        <div className="event-detail-box">
                            <h1>{event.collaborations.length}</h1>
                            <p className='box-subheader'>total collaborations</p>
                        </div>
                        <div className="event-detail-box">
                            <h1>₹{event.prizePool}</h1>
                            <p className='box-subheader'>winning amount</p>
                        </div>
                        </div>
                       
                    </div>
                
                </div>
            )
        }
    }
    const handleDeleteEvent = async (eventId) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/event/delete/${eventId}`, {
                    withCredentials: true,
                });
                setAdminEvents(AdminEvents.filter(event => event._id !== eventId));
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event. Please try again.');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCategoryClass = (category) => {
        const categoryLower = category?.toLowerCase() || '';
        switch (categoryLower) {
            case 'science':
                return 'category-science';
            case 'sports':
                return 'category-sports';
            case 'technology':
                return 'category-technology';
            default:
                return 'category-default';
        }
    };

    const LoadingSpinner = () => (
        <div className="loading-container">
            <div className="loading-spinner"></div>
        </div>
    );

    if (loading) {
        return (
            <div className="admin-events-container">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            {RenderConditional()}
        </>
    );
};

export default ManageAdminEvents;