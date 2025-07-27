import React, { Component } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const HeaderWithRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="logo-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dbnkhibzi/image/upload/v1753578429/WhatsApp_Image_2025-07-27_at_06.34.42_17a0f774_rqvd0r.jpg"
            alt="website logo"
          />
          <h1 className="website-name">Tasty Kitchens</h1>
        </Link>
        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className={getActiveClass('/')}>
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/search" className={getActiveClass('/search')}>
                Search
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/availability" className={getActiveClass('/availability')}>
                Availability
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/profile" className={getActiveClass('/profile')}>
                Profile
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/cart" className={getActiveClass('/cart')}>
                Cart
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/orders" className={getActiveClass('/orders')}>
                Orders
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="nav-bar-mobile-container">
          <ul className="nav-menu-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className={getActiveClass('/')}>
                Home
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/search" className={getActiveClass('/search')}>
                Search
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/availability" className={getActiveClass('/availability')}>
                Availability
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/profile" className={getActiveClass('/profile')}>
                Profile
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/cart" className={getActiveClass('/cart')}>
                Cart
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/orders" className={getActiveClass('/orders')}>
                Orders
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <button
                type="button"
                className="logout-mobile-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

class Header extends Component {
  render() {
    return <HeaderWithRouter />;
  }
}

export default Header;
