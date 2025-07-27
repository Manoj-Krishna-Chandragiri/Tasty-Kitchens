import React, { Component } from 'react';
import './index.css';

class OrderItem extends Component {
  getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#2d7a2d';
      case 'preparing':
        return '#f7931e';
      case 'out for delivery':
        return '#3b82f6';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  render() {
    const { orderDetails } = this.props;
    const {
      id,
      items,
      totalAmount,
      orderDate,
      status,
      estimatedDeliveryTime,
    } = orderDetails;

    const statusColor = this.getStatusColor(status);

    return (
      <li className="order-item">
        <div className="order-header">
          <div className="order-id-section">
            <h3 className="order-id">Order #{id}</h3>
            <p className="order-date">{this.formatDate(orderDate)}</p>
          </div>
          <div className="order-status-section">
            <span 
              className="order-status"
              style={{ backgroundColor: statusColor }}
            >
              {status}
            </span>
            <p className="delivery-time">
              <span className="delivery-label">Delivery:</span> {estimatedDeliveryTime}
            </p>
          </div>
        </div>
        
        <div className="order-items-section">
          <h4 className="items-heading">Items ({items.length})</h4>
          <ul className="order-items-list">
            {items.map(item => (
              <li key={item.id} className="order-food-item">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="order-food-image"
                />
                <div className="order-food-details">
                  <p className="order-food-name">{item.name}</p>
                  <p className="order-food-quantity">Qty: {item.quantity}</p>
                </div>
                <p className="order-food-price">₹ {item.cost * item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-footer">
          <div className="order-actions">
            <button 
              type="button" 
              className="reorder-btn"
              onClick={() => {
                // Add items back to cart
                const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
                const updatedCart = [...cartData];
                
                items.forEach(item => {
                  const existingIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
                  if (existingIndex !== -1) {
                    updatedCart[existingIndex].quantity += item.quantity;
                  } else {
                    updatedCart.push(item);
                  }
                });
                
                localStorage.setItem('cartData', JSON.stringify(updatedCart));
                window.location.href = '/cart';
              }}
            >
              Reorder
            </button>
            <button 
              type="button" 
              className="track-order-btn"
              onClick={() => {
                // In a real app, this would navigate to order tracking page
                alert(`Tracking Order #${id}\nStatus: ${status}`);
              }}
            >
              Track Order
            </button>
          </div>
          <div className="order-total">
            <p className="total-label">Total Amount:</p>
            <p className="total-amount">₹ {totalAmount}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default OrderItem;
