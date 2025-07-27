import React, { Component } from 'react';
import './index.css';

class FoodItem extends Component {
  state = {
    quantity: 0,
  };

  componentDidMount() {
    this.getInitialQuantity();
  }

  getInitialQuantity = () => {
    const { foodItemDetails } = this.props;
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const existingItem = cartData.find(item => item.id === foodItemDetails.id);
    
    if (existingItem) {
      this.setState({ quantity: existingItem.quantity });
    }
  };

  onIncrementQuantity = () => {
    const { quantity } = this.state;
    const updatedQuantity = quantity + 1;
    
    this.setState({ quantity: updatedQuantity });
    this.updateCartData(updatedQuantity);
  };

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    
    if (quantity > 0) {
      const updatedQuantity = quantity - 1;
      this.setState({ quantity: updatedQuantity });
      this.updateCartData(updatedQuantity);
    }
  };

  updateCartData = (updatedQuantity) => {
    const { foodItemDetails } = this.props;
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    
    const existingItemIndex = cartData.findIndex(item => item.id === foodItemDetails.id);
    
    if (updatedQuantity === 0) {
      // Remove item from cart if quantity is 0
      if (existingItemIndex !== -1) {
        cartData.splice(existingItemIndex, 1);
      }
    } else {
      const cartItem = {
        id: foodItemDetails.id,
        name: foodItemDetails.name,
        cost: foodItemDetails.cost,
        imageUrl: foodItemDetails.image_url,
        rating: foodItemDetails.rating,
        quantity: updatedQuantity,
      };
      
      if (existingItemIndex !== -1) {
        // Update existing item
        cartData[existingItemIndex] = cartItem;
      } else {
        // Add new item
        cartData.push(cartItem);
      }
    }
    
    localStorage.setItem('cartData', JSON.stringify(cartData));
  };

  render() {
    const { foodItemDetails } = this.props;
    const { quantity } = this.state;
    const {
      image_url,
      name,
      cost,
      rating,
    } = foodItemDetails;

    return (
      <li testid="foodItem" className="food-item">
        <img src={image_url} alt={name} className="food-item-image" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">₹ {cost.toFixed(2)}</p>
          <div className="food-item-rating-container">
            <span className="food-item-star-icon">⭐</span>
            <p className="food-item-rating">{rating}</p>
          </div>
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onDecrementQuantity}
              testid="decrement-count"
            >
              -
            </button>
            <p className="quantity" testid="active-count">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onIncrementQuantity}
              testid="increment-count"
            >
              +
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default FoodItem;
