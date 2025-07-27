import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from '../Header';
import Footer from '../Footer';
import LoaderComponent from '../LoaderComponent';
import RestaurantCard from '../RestaurantCard';
import { sortByOptions } from '../../App';
import { mockApiService, shouldUseMockAPI } from '../../services/mockApiService';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Home extends Component {
  state = {
    offersApiStatus: apiStatusConstants.initial,
    restaurantsApiStatus: apiStatusConstants.initial,
    offersList: [],
    restaurantsList: [],
    activePage: 1,
    totalPages: 0,
    selectedSortByValue: sortByOptions[0].value, // Default to "Highest Rated"
  };

  componentDidMount() {
    this.getOffersData();
    this.getRestaurantsData();
  }

  getOffersData = async () => {
    this.setState({ offersApiStatus: apiStatusConstants.inProgress });

    try {
      let response, data;
      
      if (shouldUseMockAPI()) {
        // Use mock API for development
        const result = await mockApiService.getOffers();
        response = { ok: result.ok };
        data = result.data;
      } else {
        // Try real API first
        const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers';
        const options = { method: 'GET' };
        
        const fetchResponse = await fetch(apiUrl, options);
        response = fetchResponse;
        data = await fetchResponse.json();
      }

      if (response.ok) {
        this.setState({
          offersApiStatus: apiStatusConstants.success,
          offersList: data.offers,
        });
      } else {
        this.setState({ offersApiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      // Fallback to mock API if real API fails
      try {
        const result = await mockApiService.getOffers();
        if (result.ok) {
          this.setState({
            offersApiStatus: apiStatusConstants.success,
            offersList: result.data.offers,
          });
        } else {
          this.setState({ offersApiStatus: apiStatusConstants.failure });
        }
      } catch (mockError) {
        this.setState({ offersApiStatus: apiStatusConstants.failure });
      }
    }
  };

  getRestaurantsData = async () => {
    this.setState({ restaurantsApiStatus: apiStatusConstants.inProgress });

    const { activePage, selectedSortByValue } = this.state;
    const limit = 9;
    const offset = (activePage - 1) * limit;

    try {
      let response, data;
      
      if (shouldUseMockAPI()) {
        // Use mock API for development
        const result = await mockApiService.getRestaurants(offset, limit, selectedSortByValue);
        response = { ok: result.ok };
        data = result.data;
      } else {
        // Try real API first
        const apiUrl = `https://apis.ccbp.in/restaurants-list?search=&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`;
        const options = { method: 'GET' };
        
        const fetchResponse = await fetch(apiUrl, options);
        response = fetchResponse;
        data = await fetchResponse.json();
      }

      if (response.ok) {
        const totalPages = Math.ceil(data.total / limit);
        
        this.setState({
          restaurantsApiStatus: apiStatusConstants.success,
          restaurantsList: data.restaurants,
          totalPages,
        });
      } else {
        this.setState({ restaurantsApiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      // Fallback to mock API if real API fails
      try {
        const result = await mockApiService.getRestaurants(offset, limit, selectedSortByValue);
        if (result.ok) {
          const totalPages = Math.ceil(result.data.total / limit);
          
          this.setState({
            restaurantsApiStatus: apiStatusConstants.success,
            restaurantsList: result.data.restaurants,
            totalPages,
          });
        } else {
          this.setState({ restaurantsApiStatus: apiStatusConstants.failure });
        }
      } catch (mockError) {
        this.setState({ restaurantsApiStatus: apiStatusConstants.failure });
      }
    }
  };

  onChangeSortBy = event => {
    this.setState(
      { selectedSortByValue: event.target.value, activePage: 1 },
      this.getRestaurantsData
    );
  };

  onClickPreviousPage = () => {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.setState(
        { activePage: activePage - 1 },
        this.getRestaurantsData
      );
    }
  };

  onClickNextPage = () => {
    const { activePage, totalPages } = this.state;
    if (activePage < totalPages) {
      this.setState(
        { activePage: activePage + 1 },
        this.getRestaurantsData
      );
    }
  };

  renderOffersLoader = () => (
    <LoaderComponent testId="restaurants-offers-loader" />
  );

  renderRestaurantsLoader = () => (
    <LoaderComponent testId="restaurants-list-loader" />
  );

  renderOffersSlider = () => {
    const { offersList } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      prevArrow: <button type="button" className="slick-prev custom-prev">‹</button>,
      nextArrow: <button type="button" className="slick-next custom-next">›</button>,
    };

    return (
      <div className="offers-container">
        <Slider {...settings}>
          {offersList.map(offer => (
            <div key={offer.id} className="offer-item">
              <img src={offer.image_url} alt="offer" className="offer-image" />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  renderPopularRestaurants = () => {
    const { restaurantsList, selectedSortByValue } = this.state;

    return (
      <div className="popular-restaurants-container">
        <div className="popular-restaurants-header">
          <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
          <div className="sort-by-container">
            <p className="sort-by-text">Sort by</p>
            <select
              className="sort-by-select"
              value={selectedSortByValue}
              onChange={this.onChangeSortBy}
            >
              {sortByOptions.map(option => (
                <option key={option.id} value={option.value}>
                  {option.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="line" />
        <ul className="restaurants-list">
          {restaurantsList.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
          ))}
        </ul>
        {this.renderPagination()}
      </div>
    );
  };

  renderPagination = () => {
    const { activePage, totalPages } = this.state;

    return (
      <div className="pagination-container">
        <button
          type="button"
          className="pagination-button"
          onClick={this.onClickPreviousPage}
          disabled={activePage === 1}
          testid="pagination-left-button"
        >
          &lt;
        </button>
        <p className="active-page-number">
          <span testid="active-page-number">{activePage}</span> of {totalPages}
        </p>
        <button
          type="button"
          className="pagination-button"
          onClick={this.onClickNextPage}
          disabled={activePage === totalPages}
          testid="pagination-right-button"
        >
          &gt;
        </button>
      </div>
    );
  };

  renderOffersView = () => {
    const { offersApiStatus } = this.state;

    switch (offersApiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersSlider();
      case apiStatusConstants.failure:
        return null; // Handle failure case if needed
      case apiStatusConstants.inProgress:
        return this.renderOffersLoader();
      default:
        return null;
    }
  };

  renderRestaurantsView = () => {
    const { restaurantsApiStatus } = this.state;

    switch (restaurantsApiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularRestaurants();
      case apiStatusConstants.failure:
        return null; // Handle failure case if needed
      case apiStatusConstants.inProgress:
        return this.renderRestaurantsLoader();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          {this.renderOffersView()}
          {this.renderRestaurantsView()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
