import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import LoaderComponent from '../LoaderComponent';
import { mockApiService, shouldUseMockAPI } from '../../services/mockApiService';
import './index.css';

class Search extends Component {
  state = {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    hasSearched: false,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
  };

  componentDidMount() {
    // Get search query from URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      this.setState({ searchQuery: query }, this.performSearch);
    }
  }

  onChangeSearchQuery = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
    this.performSearch();
  };

  performSearch = async () => {
    const { searchQuery, itemsPerPage } = this.state;
    
    if (searchQuery.trim() === '') return;

    this.setState({ isLoading: true, hasSearched: true, currentPage: 1 });

    try {
      if (shouldUseMockAPI) {
        const response = await mockApiService.searchRestaurants(searchQuery, 0, 100);
        if (response.ok) {
          const totalResults = response.data.restaurants.length;
          const totalPages = Math.ceil(totalResults / itemsPerPage);
          
          this.setState({
            searchResults: response.data.restaurants,
            totalPages,
            isLoading: false,
          });
        } else {
          this.setState({
            searchResults: [],
            totalPages: 1,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      this.setState({
        searchResults: [],
        totalPages: 1,
        isLoading: false,
      });
    }
  };

  onClickPrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  onClickNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  getCurrentPageResults = () => {
    const { searchResults, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchResults.slice(startIndex, endIndex);
  };

  renderSearchForm = () => {
    const { searchQuery } = this.state;

    return (
      <form className="search-form" onSubmit={this.onSubmitSearch}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchQuery}
            onChange={this.onChangeSearchQuery}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>
    );
  };

  renderRestaurantCard = (restaurant) => (
    <Link
      to={`/restaurant/${restaurant.id}`}
      key={restaurant.id}
      className="restaurant-card-link"
    >
      <div className="search-restaurant-card">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="search-restaurant-image"
        />
        <div className="search-restaurant-info">
          <h3 className="search-restaurant-name">{restaurant.name}</h3>
          <p className="search-restaurant-cuisine">{restaurant.cuisine}</p>
          <div className="search-restaurant-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{restaurant.user_rating.rating}</span>
            <span className="rating-reviews">({restaurant.user_rating.total_reviews} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );

  renderSearchResults = () => {
    const { searchResults, hasSearched, searchQuery } = this.state;
    const currentPageResults = this.getCurrentPageResults();

    if (!hasSearched) {
      return (
        <div className="search-initial">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center"
            alt="search"
            className="search-initial-image"
          />
          <h2 className="search-initial-heading">Find Your Favorite Restaurant</h2>
          <p className="search-initial-text">
            Search from our collection of restaurants and discover amazing food
          </p>
        </div>
      );
    }

    if (searchResults.length === 0) {
      return (
        <div className="no-results">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center"
            alt="no results"
            className="no-results-image"
          />
          <h2 className="no-results-heading">No Results Found</h2>
          <p className="no-results-text">
            We couldn't find any restaurants matching "{searchQuery}".
            Try searching with different keywords.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="search-results-header">
          <h2 className="search-results-heading">
            Search Results for "{searchQuery}" ({searchResults.length} found)
          </h2>
        </div>
        <div className="search-results-grid">
          {currentPageResults.map(this.renderRestaurantCard)}
        </div>
        {this.renderPagination()}
      </>
    );
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;

    if (totalPages <= 1) return null;

    return (
      <div className="search-pagination">
        <button
          type="button"
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={this.onClickPrevPage}
        >
          ⬅️ Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={this.onClickNextPage}
        >
          Next ➡️
        </button>
      </div>
    );
  };

  renderLoader = () => <LoaderComponent testId="search-loader" />;

  render() {
    const { isLoading } = this.state;

    return (
      <div className="search-container">
        <Header />
        <div className="search-content">
          <div className="search-header">
            <h1 className="search-title">Restaurant Search</h1>
            {this.renderSearchForm()}
          </div>
          
          <div className="search-body">
            {isLoading ? this.renderLoader() : this.renderSearchResults()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
