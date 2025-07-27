import React from 'react';
import './index.css';

const OrderSuccessPopup = ({ isVisible, orderDetails, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <div className="success-icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/success-icon.png"
              alt="success"
              className="success-icon"
            />
          </div>
          <h2 className="popup-heading">Order Placed Successfully!</h2>
          <div className="order-details">
            <p className="order-id">Order ID: <span className="highlight">{orderDetails.orderId}</span></p>
            <p className="delivery-time">Estimated Delivery: <span className="highlight">{orderDetails.estimatedDeliveryTime}</span></p>
            <p className="total-amount">Total Amount: <span className="highlight">₹ {orderDetails.totalAmount}</span></p>
          </div>
          <p className="popup-message">
            Your delicious food is being prepared and will be delivered soon!
          </p>
          <div className="popup-buttons">
            <button 
              type="button" 
              className="continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>
            <button 
              type="button" 
              className="view-orders-btn"
              onClick={() => {
                onClose();
                // Navigate to orders page
                window.location.href = '/orders';
              }}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
