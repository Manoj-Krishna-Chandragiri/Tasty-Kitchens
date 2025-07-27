import React, { Component } from 'react';
import './index.css';

class OrderForm extends Component {
  state = {
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    errors: {},
    isProcessing: false,
  };

  validateForm = () => {
    const { name, address, phone, paymentMethod, cardNumber, expiryDate, cvv, upiId } = this.state;
    const errors = {};

    if (!name.trim()) errors.name = 'Name is required';
    if (!address.trim()) errors.address = 'Address is required';
    if (!phone.trim() || phone.length !== 10) errors.phone = 'Valid 10-digit phone number is required';

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.length !== 16) errors.cardNumber = 'Valid 16-digit card number is required';
      if (!expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
      if (!cvv.trim() || cvv.length !== 3) errors.cvv = 'Valid 3-digit CVV is required';
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) errors.upiId = 'Valid UPI ID is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setState({ isProcessing: true });

    // Simulate payment processing
    setTimeout(() => {
      const { onPaymentSuccess } = this.props;
      const { name, address, phone, paymentMethod } = this.state;
      
      const orderDetails = {
        customerName: name,
        address,
        phone,
        paymentMethod,
        paymentStatus: 'Success',
      };

      onPaymentSuccess(orderDetails);
    }, 2000);
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ 
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }
    });
  };

  render() {
    const { 
      name, address, phone, paymentMethod, cardNumber, expiryDate, cvv, upiId, 
      errors, isProcessing 
    } = this.state;
    const { onCancel, totalAmount } = this.props;

    return (
      <div className="order-form-overlay">
        <div className="order-form-container">
          <h2 className="order-form-title">Order Details</h2>
          <form onSubmit={this.handleSubmit} className="order-form">
            <div className="form-section">
              <h3>Delivery Information</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={address}
                  onChange={this.handleInputChange}
                  className={errors.address ? 'error' : ''}
                  rows="3"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={this.handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="10-digit number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Information</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={this.handleInputChange}
                  />
                  Credit/Debit Card
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={this.handleInputChange}
                  />
                  UPI
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={this.handleInputChange}
                  />
                  Cash on Delivery
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardNumber}
                      onChange={this.handleInputChange}
                      className={errors.cardNumber ? 'error' : ''}
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="month"
                        id="expiryDate"
                        name="expiryDate"
                        value={expiryDate}
                        onChange={this.handleInputChange}
                        className={errors.expiryDate ? 'error' : ''}
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={this.handleInputChange}
                        className={errors.cvv ? 'error' : ''}
                        placeholder="123"
                        maxLength="3"
                      />
                      {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID *</label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={upiId}
                    onChange={this.handleInputChange}
                    className={errors.upiId ? 'error' : ''}
                    placeholder="yourname@upi"
                  />
                  {errors.upiId && <span className="error-message">{errors.upiId}</span>}
                </div>
              )}
            </div>

            <div className="order-summary">
              <h3>Order Total: ₹ {totalAmount.toFixed(2)}</h3>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onCancel} className="cancel-button">
                Cancel
              </button>
              <button 
                type="submit" 
                className="pay-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ₹ ${totalAmount.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default OrderForm;
