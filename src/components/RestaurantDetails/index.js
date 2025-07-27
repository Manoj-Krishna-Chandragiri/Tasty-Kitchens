import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import LoaderComponent from '../LoaderComponent';
import FoodItem from '../FoodItem';
import { mockApiService, shouldUseMockAPI } from '../../services/mockApiService';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const RestaurantDetailsWithRouter = () => {
  const { id } = useParams();
  return <RestaurantDetailsBase restaurantId={id} />;
};

class RestaurantDetailsBase extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantData: {},
    foodItems: [],
  };

  componentDidMount() {
    this.getRestaurantDetails();
  }

  getRestaurantDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const { restaurantId } = this.props;

    try {
      let response, data;
      
      if (shouldUseMockAPI()) {
        // Use mock API for development
        const result = await mockApiService.getRestaurantDetails(restaurantId);
        response = { ok: result.ok };
        data = result.data;
      } else {
        // Try real API first
        const apiUrl = `https://apis.ccbp.in/restaurants-list/${restaurantId}`;
        const options = { method: 'GET' };
        
        const fetchResponse = await fetch(apiUrl, options);
        response = fetchResponse;
        data = await fetchResponse.json();
      }

      if (response.ok) {
        this.setState({
          apiStatus: apiStatusConstants.success,
          restaurantData: data,
          foodItems: data.food_items,
        });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      // Fallback to mock API if real API fails
      try {
        const result = await mockApiService.getRestaurantDetails(restaurantId);
        if (result.ok) {
          this.setState({
            apiStatus: apiStatusConstants.success,
            restaurantData: result.data,
            foodItems: result.data.food_items,
          });
        } else {
          this.setState({ apiStatus: apiStatusConstants.failure });
        }
      } catch (mockError) {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    }
  };

  renderRestaurantDetailsView = () => {
    const { restaurantData, foodItems } = this.state;
    const {
      name,
      cuisine,
      image_url,
      location,
      rating,
      reviews_count,
    } = restaurantData;

    return (
      <div className="restaurant-details-content">
        <div className="restaurant-banner">
          <img
            src={image_url}
            alt="restaurant"
            className="restaurant-details-image"
          />
          <div className="restaurant-info">
            <h1 className="restaurant-details-name">{name}</h1>
            <p className="restaurant-details-cuisine">{cuisine}</p>
            <p className="restaurant-details-location">{location}</p>
            <div className="restaurant-rating-container">
              <div className="rating-info">
                <span className="rating-star">⭐</span>
                <p className="restaurant-rating">{rating}</p>
              </div>
              <p className="restaurant-reviews">{reviews_count}+ Ratings</p>
            </div>
          </div>
        </div>
        <hr className="separator" />
        <ul className="food-items-list">
          {foodItems.map(foodItem => (
            <FoodItem key={foodItem.id} foodItemDetails={foodItem} />
          ))}
        </ul>
      </div>
    );
  };

  renderLoader = () => (
    <LoaderComponent testId="restaurant-details-loader" />
  );

  renderRestaurantDetailsFailureView = () => (
    <div className="failure-view-container">
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
    </div>
  );

  renderRestaurantDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView();
      case apiStatusConstants.failure:
        return this.renderRestaurantDetailsFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="restaurant-details-container">
        <Header />
        <div className="restaurant-details-responsive-container">
          {this.renderRestaurantDetails()}
        </div>
        <Footer />
      </div>
    );
  }
}

const RestaurantDetails = () => <RestaurantDetailsWithRouter />;

export default RestaurantDetails;
