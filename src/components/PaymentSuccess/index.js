import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const PaymentSuccessWithRouter = ({ orderDetails }) => {
  const navigate = useNavigate();

  const handleGoToOrders = () => {
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        <div className="order-info">
          <h3>Order Details:</h3>
          <div className="order-detail-item">
            <span className="label">Order ID:</span>
            <span className="value">#{orderDetails.orderId}</span>
          </div>
          <div className="order-detail-item">
            <span className="label">Customer:</span>
            <span className="value">{orderDetails.customerName}</span>
          </div>
          <div className="order-detail-item">
            <span className="label">Total Amount:</span>
            <span className="value">₹ {orderDetails.totalAmount.toFixed(2)}</span>
          </div>
          <div className="order-detail-item">
            <span className="label">Payment Method:</span>
            <span className="value">{orderDetails.paymentMethod.toUpperCase()}</span>
          </div>
          <div className="order-detail-item">
            <span className="label">Delivery Address:</span>
            <span className="value">{orderDetails.address}</span>
          </div>
        </div>

        <div className="estimated-delivery">
          <h4>📦 Estimated Delivery Time: 30-45 minutes</h4>
        </div>

        <div className="success-actions">
          <button 
            type="button" 
            onClick={handleGoToOrders}
            className="orders-button"
          >
            View My Orders
          </button>
          <button 
            type="button" 
            onClick={handleContinueShopping}
            className="continue-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

class PaymentSuccess extends Component {
  render() {
    return <PaymentSuccessWithRouter {...this.props} />;
  }
}

export default PaymentSuccess;
