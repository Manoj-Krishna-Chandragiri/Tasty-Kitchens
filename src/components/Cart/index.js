import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import CartItem from '../CartItem';
import OrderForm from '../OrderForm';
import PaymentSuccess from '../PaymentSuccess';
import { orderService, userService } from '../../services/orderService';
import './index.css';

class Cart extends Component {
  state = {
    cartData: [],
    showOrderForm: false,
    showPaymentSuccess: false,
    orderDetails: null,
  };

  componentDidMount() {
    this.getCartData();
  }

  getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    this.setState({ cartData });
  };

  updateCartItemQuantity = (id, quantity) => {
    const { cartData } = this.state;
    const updatedCartData = cartData.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    
    // Remove items with quantity 0
    const filteredCartData = updatedCartData.filter(item => item.quantity > 0);
    
    this.setState({ cartData: filteredCartData });
    localStorage.setItem('cartData', JSON.stringify(filteredCartData));
  };

  getTotalPrice = () => {
    const { cartData } = this.state;
    return cartData.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  onPlaceOrder = () => {
    const { cartData } = this.state;
    
    if (cartData.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.setState({ showOrderForm: true });
  };

  onCancelOrder = () => {
    this.setState({ showOrderForm: false });
  };

  onPaymentSuccess = async (customerDetails) => {
    const { cartData } = this.state;
    const userId = userService.getCurrentUserId();
    
    if (!userId) {
      alert('Please log in to place an order');
      return;
    }

    try {
      const orderData = {
        userId,
        restaurantId: 'multi', // Since cart can have items from multiple restaurants
        restaurantName: 'Various Restaurants',
        items: cartData,
        totalAmount: this.getTotalPrice(),
        ...customerDetails,
      };

      const result = await orderService.placeOrder(orderData);

      if (result.ok) {
        // Clear cart
        localStorage.removeItem('cartData');
        this.setState({
          cartData: [],
          showOrderForm: false,
          showPaymentSuccess: true,
          orderDetails: {
            ...result.data,
            ...customerDetails,
            totalAmount: this.getTotalPrice(),
          },
        });
      } else {
        throw new Error('Order placement failed');
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
      this.setState({ showOrderForm: false });
    }
  };

  onClosePaymentSuccess = () => {
    this.setState({ 
      showPaymentSuccess: false, 
      orderDetails: null 
    });
  };

  renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://img.freepik.com/premium-vector/empty-cart_701961-7086.jpg"
        className="empty-cart-image"
        alt="empty cart"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
    </div>
  );

  renderCartItemsView = () => {
    const { cartData } = this.state;
    const totalPrice = this.getTotalPrice();

    return (
      <div className="cart-content-container">
        <ul className="cart-list">
          {cartData.map(cartItem => (
            <CartItem
              key={cartItem.id}
              cartItemDetails={cartItem}
              updateCartItemQuantity={this.updateCartItemQuantity}
            />
          ))}
        </ul>
        <hr className="cart-hr-line" />
        <div className="cart-total-container">
          <h1 className="order-total-label">Order Total:</h1>
          <p className="order-total-value" testid="total-price">
            ₹ {totalPrice.toFixed(2)}
          </p>
        </div>
        <button 
          type="button" 
          className="place-order-button"
          onClick={this.onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    );
  };

  render() {
    const { cartData, showOrderForm, showPaymentSuccess, orderDetails } = this.state;
    
    if (showPaymentSuccess) {
      return (
        <div className="cart-container">
          <Header />
          <PaymentSuccess orderDetails={orderDetails} />
          <Footer />
        </div>
      );
    }
    
    return (
      <div className="cart-container">
        <Header />
        <div className="cart-responsive-container">
          {cartData.length === 0
            ? this.renderEmptyCartView()
            : this.renderCartItemsView()}
        </div>
        <Footer />
        {showOrderForm && (
          <OrderForm 
            totalAmount={this.getTotalPrice()}
            onPaymentSuccess={this.onPaymentSuccess}
            onCancel={this.onCancelOrder}
          />
        )}
      </div>
    );
  }
}

export default Cart;
