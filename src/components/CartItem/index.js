import React, { Component } from 'react';
import './index.css';

class CartItem extends Component {
  onIncrementQuantity = () => {
    const { cartItemDetails, updateCartItemQuantity } = this.props;
    const { id, quantity } = cartItemDetails;
    updateCartItemQuantity(id, quantity + 1);
  };

  onDecrementQuantity = () => {
    const { cartItemDetails, updateCartItemQuantity } = this.props;
    const { id, quantity } = cartItemDetails;
    if (quantity > 1) {
      updateCartItemQuantity(id, quantity - 1);
    } else {
      updateCartItemQuantity(id, 0);
    }
  };

  render() {
    const { cartItemDetails } = this.props;
    const { imageUrl, name, quantity, cost } = cartItemDetails;
    const totalPrice = cost * quantity;

    return (
      <li testid="cartItem" className="cart-item">
        <img className="cart-product-image" src={imageUrl} alt={name} />
        <div className="cart-item-details-container">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{name}</p>
          </div>
          <div className="cart-quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onDecrementQuantity}
              testid="decrement-quantity"
            >
              -
            </button>
            <p className="cart-quantity" testid="item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onIncrementQuantity}
              testid="increment-quantity"
            >
              +
            </button>
          </div>
          <div className="total-price-container">
            <p className="cart-total-price">₹ {totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
