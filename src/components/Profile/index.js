import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

class Profile extends Component {
  state = {
    userProfile: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    userStats: {
      totalOrders: 0,
      favoriteRestaurants: 0,
      totalSpent: 0,
    },
  };

  componentDidMount() {
    this.getUserProfile();
    // Listen for focus events to refresh stats when user returns to page
    window.addEventListener('focus', this.getUserProfile);
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.getUserProfile);
  }

  getUserProfile = () => {
    // Get user data from localStorage or mock data
    const username = localStorage.getItem('username') || 'Guest User';
    
    // Mock user profiles based on login credentials
    const userProfiles = {
      rahul: {
        name: 'Rahul Kumar',
        email: 'rahul.kumar@example.com',
        phone: '+91 9876543210',
        address: '123 Tech Park, Hyderabad, Telangana 500081',
      },
      henry: {
        name: 'Henry Developer',
        email: 'henry.dev@example.com',
        phone: '+91 8765432109',
        address: '456 Silicon Valley, Bangalore, Karnataka 560001',
      },
      manoj: {
        name: 'Manoj Krishna',
        email: 'manoj.krishna@example.com',
        phone: '+91 7654321098',
        address: '789 IT Hub, Gachibowli, Hyderabad, Telangana 500032',
      },
    };

    const profile = userProfiles[username] || {
      name: 'Guest User',
      email: 'guest@example.com',
      phone: '+91 0000000000',
      address: 'Not Available',
    };

    // Get user stats from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('All orders from localStorage:', orders);
    console.log('Current username:', username);
    
    const userOrders = orders.filter(order => {
      console.log('Order userId:', order.userId, 'Current username:', username);
      return order.userId === username;
    });
    
    console.log('Filtered user orders:', userOrders);
    
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => {
      const orderAmount = order.totalAmount || order.totalPrice || 0;
      console.log('Order amount:', orderAmount);
      return sum + orderAmount;
    }, 0);
    
    // Count unique restaurants from orders
    const uniqueRestaurants = new Set(userOrders.map(order => order.restaurantId || order.restaurantName));
    const favoriteRestaurants = uniqueRestaurants.size;

    console.log('Stats calculated:', { totalOrders, favoriteRestaurants, totalSpent });

    this.setState({ 
      userProfile: profile,
      userStats: {
        totalOrders,
        favoriteRestaurants,
        totalSpent,
      },
    });
  };

  render() {
    const { userProfile, userStats } = this.state;

    return (
      <div className="profile-container">
        <Header />
        <div className="profile-content">
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">Manage your account information</p>
            <button 
              type="button" 
              className="refresh-stats-btn"
              onClick={this.getUserProfile}
            >
              🔄 Refresh Stats
            </button>
          </div>
          
          <div className="profile-card">
            <div className="profile-avatar">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
                alt="profile"
                className="avatar-image"
              />
            </div>
            
            <div className="profile-details">
              <div className="profile-field">
                <label className="field-label">Full Name</label>
                <div className="field-value">{userProfile.name}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Email Address</label>
                <div className="field-value">{userProfile.email}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Phone Number</label>
                <div className="field-value">{userProfile.phone}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Address</label>
                <div className="field-value">{userProfile.address}</div>
              </div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat-card">
              <h3 className="stat-number">{userStats.totalOrders}</h3>
              <p className="stat-label">Total Orders</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{userStats.favoriteRestaurants}</h3>
              <p className="stat-label">Favorite Restaurants</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">₹{userStats.totalSpent.toFixed(2)}</h3>
              <p className="stat-label">Total Spent</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
