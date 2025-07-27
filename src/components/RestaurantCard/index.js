import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const RestaurantCard = props => {
  const { restaurantData } = props;
  const {
    id,
    name,
    cuisine,
    image_url,
    user_rating,
  } = restaurantData;

  return (
    <li testid="restaurant-item" className="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-link">
        <img src={image_url} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-details">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-container">
            <span className="star-icon">⭐</span>
            <p className="rating">{user_rating.rating}</p>
            <p className="total-reviews">({user_rating.total_reviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default RestaurantCard;
