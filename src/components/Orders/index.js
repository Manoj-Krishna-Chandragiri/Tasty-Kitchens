import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LoaderComponent from '../LoaderComponent';
import OrderItem from '../OrderItem';
import { orderService, userService } from '../../services/orderService';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Orders extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    ordersList: [],
    userProfile: null,
  };

  componentDidMount() {
    this.getUserOrdersData();
  }

  getUserOrdersData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    try {
      const userId = userService.getCurrentUserId();
      
      if (!userId) {
        this.setState({ apiStatus: apiStatusConstants.failure });
        return;
      }

      // Get user profile and orders
      const [ordersResult, profileResult] = await Promise.all([
        orderService.getUserOrders(userId),
        userService.getUserProfile(userId),
      ]);

      if (ordersResult.ok) {
        this.setState({
          apiStatus: apiStatusConstants.success,
          ordersList: ordersResult.data.orders,
          userProfile: profileResult.ok ? profileResult.data : null,
        });
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure });
      }
    } catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderOrdersLoader = () => (
    <LoaderComponent testId="orders-loader" />
  );

  renderNoOrdersView = () => (
    <div className="no-orders-container">
      <img
        src="https://res.cloudinary.com/dbnkhibzi/image/upload/v1753591666/WhatsApp_Image_2025-07-27_at_10.06.52_591a4928_tnojkc.jpg"
        className="no-orders-image"
        alt="no orders"
      />
      <h1 className="no-orders-heading">No Orders Yet!</h1>
      <p className="no-orders-description">
        You haven't placed any orders yet. Start exploring restaurants and place your first order!
      </p>
      <button 
        type="button" 
        className="explore-restaurants-btn"
        onClick={() => window.location.href = '/'}
      >
        Explore Restaurants
      </button>
    </div>
  );

  renderOrdersList = () => {
    const { ordersList, userProfile } = this.state;

    return (
      <div className="orders-content">
        <div className="orders-header">
          <h1 className="orders-heading">My Orders</h1>
          {userProfile && (
            <div className="user-info">
              <p className="user-name">{userProfile.name}</p>
              <p className="user-email">{userProfile.email}</p>
            </div>
          )}
        </div>
        <div className="orders-summary">
          <p className="orders-count">
            Total Orders: <span className="count-highlight">{ordersList.length}</span>
          </p>
        </div>
        <ul className="orders-list">
          {ordersList.map(order => (
            <OrderItem key={order.id} orderDetails={order} />
          ))}
        </ul>
      </div>
    );
  };

  renderOrdersFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button 
        type="button" 
        className="retry-button"
        onClick={this.getUserOrdersData}
      >
        Try Again
      </button>
    </div>
  );

  renderOrdersView = () => {
    const { ordersList } = this.state;

    if (ordersList.length === 0) {
      return this.renderNoOrdersView();
    }

    return this.renderOrdersList();
  };

  renderOrders = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOrdersView();
      case apiStatusConstants.failure:
        return this.renderOrdersFailureView();
      case apiStatusConstants.inProgress:
        return this.renderOrdersLoader();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="orders-container">
        <Header />
        <div className="orders-responsive-container">
          {this.renderOrders()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Orders;
