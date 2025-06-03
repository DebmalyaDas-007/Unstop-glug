import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ title, subtitle, icon, style }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/category/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="category-card" onClick={handleCategoryClick} style={style}>
      <div className="category-card-content">
        <div className="icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
