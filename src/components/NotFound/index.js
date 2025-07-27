import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/page-not-found.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found.
        Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="home-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
);

export default NotFound;
