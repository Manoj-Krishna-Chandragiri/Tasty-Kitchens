import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import RestaurantCard from '../RestaurantCard';
import LoaderComponent from '../LoaderComponent';
import { mockApiService, shouldUseMockAPI } from '../../services/mockApiService';
import './index.css';

class RestaurantAvailability extends Component {
  state = {
    restaurants: [],
    isLoading: true,
    currentTime: new Date(),
  };

  componentDidMount() {
    this.getRestaurants();
    // Update time every minute
    this.timeInterval = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 60000);
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  getRestaurants = async () => {
    this.setState({ isLoading: true });

    try {
      if (shouldUseMockAPI) {
        const response = await mockApiService.getRestaurants(0, 50);
        if (response.ok) {
          const restaurantsWithAvailability = response.data.restaurants.map(restaurant => ({
            ...restaurant,
            availability: this.getRestaurantAvailability(restaurant.id),
          }));
          
          this.setState({
            restaurants: restaurantsWithAvailability,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      this.setState({ isLoading: false });
    }
  };

  getRestaurantAvailability = (restaurantId) => {
    const { currentTime } = this.state;
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Mock availability schedules for different restaurants
    const schedules = {
      '2200': { open: 11 * 60, close: 23 * 60 }, // 11:00 AM - 11:00 PM
      '2201': { open: 10 * 60 + 30, close: 22 * 60 + 30 }, // 10:30 AM - 10:30 PM
      '2202': { open: 9 * 60, close: 22 * 60 }, // 9:00 AM - 10:00 PM
      '2203': { open: 7 * 60, close: 21 * 60 }, // 7:00 AM - 9:00 PM
      '2204': { open: 11 * 60, close: 24 * 60 }, // 11:00 AM - 12:00 AM
      '2205': { open: 10 * 60, close: 23 * 60 }, // 10:00 AM - 11:00 PM
      '2206': { open: 6 * 60, close: 24 * 60 }, // 6:00 AM - 12:00 AM
      '2207': { open: 10 * 60, close: 23 * 60 }, // 10:00 AM - 11:00 PM
      '2208': { open: 11 * 60, close: 22 * 60 }, // 11:00 AM - 10:00 PM
      '2209': { open: 8 * 60, close: 21 * 60 }, // 8:00 AM - 9:00 PM
      '2210': { open: 12 * 60, close: 23 * 60 + 30 }, // 12:00 PM - 11:30 PM
      '2211': { open: 8 * 60, close: 22 * 60 }, // 8:00 AM - 10:00 PM
      '2212': { open: 11 * 60, close: 22 * 60 + 30 }, // 11:00 AM - 10:30 PM
      '2213': { open: 7 * 60, close: 21 * 60 + 30 }, // 7:00 AM - 9:30 PM
    };

    const schedule = schedules[restaurantId] || { open: 9 * 60, close: 22 * 60 };
    const isOpen = currentTimeInMinutes >= schedule.open && currentTimeInMinutes <= schedule.close;

    let nextAvailable = '';
    if (!isOpen) {
      if (currentTimeInMinutes < schedule.open) {
        // Restaurant opens today
        const openHour = Math.floor(schedule.open / 60);
        const openMinute = schedule.open % 60;
        nextAvailable = `Opens at ${this.formatTime(openHour, openMinute)}`;
      } else {
        // Restaurant opens tomorrow
        const openHour = Math.floor(schedule.open / 60);
        const openMinute = schedule.open % 60;
        nextAvailable = `Opens tomorrow at ${this.formatTime(openHour, openMinute)}`;
      }
    }

    const closeHour = Math.floor(schedule.close / 60);
    const closeMinute = schedule.close % 60;

    return {
      isOpen,
      openTime: this.formatTime(Math.floor(schedule.open / 60), schedule.open % 60),
      closeTime: this.formatTime(closeHour >= 24 ? closeHour - 24 : closeHour, closeMinute),
      nextAvailable,
    };
  };

  formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };

  renderRestaurantCard = (restaurant) => (
    <div key={restaurant.id} className="availability-restaurant-card">
      <RestaurantCard restaurantData={restaurant} />
      <div className="availability-info">
        <div className={`availability-status ${restaurant.availability.isOpen ? 'open' : 'closed'}`}>
          {restaurant.availability.isOpen ? '🟢 Open Now' : '🔴 Closed'}
        </div>
        <div className="availability-timing">
          <p className="timing-text">
            Hours: {restaurant.availability.openTime} - {restaurant.availability.closeTime}
          </p>
          {!restaurant.availability.isOpen && (
            <p className="next-available">{restaurant.availability.nextAvailable}</p>
          )}
        </div>
      </div>
    </div>
  );

  renderLoader = () => <LoaderComponent testId="availability-loader" />;

  render() {
    const { restaurants, isLoading, currentTime } = this.state;
    const openRestaurants = restaurants.filter(restaurant => restaurant.availability.isOpen);
    const closedRestaurants = restaurants.filter(restaurant => !restaurant.availability.isOpen);

    return (
      <div className="availability-container">
        <Header />
        <div className="availability-content">
          <div className="availability-header">
            <h1 className="availability-title">Restaurant Availability</h1>
            <p className="current-time">
              Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              {openRestaurants.length > 0 && (
                <div className="availability-section">
                  <h2 className="section-title open-title">
                    🟢 Open Now ({openRestaurants.length})
                  </h2>
                  <div className="restaurants-grid">
                    {openRestaurants.map(this.renderRestaurantCard)}
                  </div>
                </div>
              )}

              {closedRestaurants.length > 0 && (
                <div className="availability-section">
                  <h2 className="section-title closed-title">
                    🔴 Currently Closed ({closedRestaurants.length})
                  </h2>
                  <div className="restaurants-grid">
                    {closedRestaurants.map(this.renderRestaurantCard)}
                  </div>
                </div>
              )}

              {restaurants.length === 0 && (
                <div className="no-restaurants">
                  <p>No restaurants found.</p>
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default RestaurantAvailability;
