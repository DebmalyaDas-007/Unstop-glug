import React from 'react';
import '../styles/EventCard.css'; 

const EventCard = (props) => {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src="https://picsum.photos/200/150"
          alt="Event"
          className="event-image"
        />
        <span className="discount-badge">trending</span>
      </div>

      <div className="event-details">
    <h2 className="event-title">{props.title}</h2>
        <p className="event-location">{props.Location}</p>
        <p className="event-rating">
          ⭐ 4.2 <span className="rating-count">(117)</span>
        </p>

        <div className="event-tags">
          <span>Free Wifi</span>
          <span>Parking</span>
          <span>Food</span>
          <span>Accessible</span>
        </div>

        <div className="event-footer">
          <span className="deal-tag">Deal</span>
          <div className="price-book">
            <button className="book-button">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

