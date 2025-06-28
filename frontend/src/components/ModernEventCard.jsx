import React, { useState } from 'react';
import '../styles/ModernEventCard.css'; 
import { userContext } from '../contextAPI/UserContext';
import { useContext } from 'react';
const ModernEventCard = (props) => {

  return (
    <div className="modern-event-card" >
        
      <div className="event-image-container-card">
        <img
          src={props.image || "https://picsum.photos/400/200"}
          alt="Event"
          className="event-image"
        />
      </div>

      <div className="event-info">
        <div className="event-date">
            
          <span className="event-day">{props.day || "24"}</span>
          <span className="event-month">{props.month || "DEC"}</span>
        </div>

        <div className="event-main">
          <p className="event-location">📍 {props.location || "Mumbai, India"}</p>
          <h3 className="event-title">{props.title || "Bollywood Beats Night"}</h3>
          <p className="event-description">
            "Hey! Don’t miss out — join us at {props.title} and be part of the experience!
Get ready for an unforgettable time filled with energy, creativity, and connections. Whether you're here for the vibes, the performances, or just to meet awesome people — this event has something for everyone.

Spots are limited, so register now and secure your place before it’s gone!"
          </p>
          <p className="event-price">Register to win</p>
        </div>
      </div>

      <div className="event-footer">
        <button className="register-button">Register</button>
      </div>
    </div>
  );
};

export default ModernEventCard;
