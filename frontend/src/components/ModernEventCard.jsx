import React, { useState } from 'react';
import '../styles/ModernEventCard.css'; 

const ModernEventCard = (props) => {
  return (
    <div className="modern-event-card" >
        
      <div className="event-image-container">
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
            {props.description || "Experience the glitz and glamour of Bollywood like never before, featuring live performances, DJ sets, and dance acts."}
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
