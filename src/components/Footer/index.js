import React from 'react';
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa';
import './index.css';

const Footer = () => (
  <div className="footer-section">
    <div className="footer-content">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dbnkhibzi/image/upload/v1753578429/WhatsApp_Image_2025-07-27_at_06.34.42_17a0f774_rqvd0r.jpg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-title">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. 
        Contact us on
      </p>
      <div className="social-icons-container">
        <FaPinterestSquare
          className="social-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="social-icon" testid="instagram-social-icon" />
        <FaTwitter className="social-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  </div>
);

export default Footer;
