import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { mockApiService, shouldUseMockAPI } from '../../services/mockApiService';
import './index.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isLoading: false,
  };

  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = jwtToken => {
    const { username } = this.state;
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    // Store username for profile page
    localStorage.setItem('username', username);
    this.setState({ isLoading: false });
    // Navigate to home will be handled by redirect
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg, isLoading: false });
  };

  submitForm = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    
    const { username, password } = this.state;

    try {
      let response, data;
      
      if (shouldUseMockAPI()) {
        // Use mock API for development
        const result = await mockApiService.login(username, password);
        response = { ok: result.ok };
        data = result.data;
      } else {
        // Try real API first
        const userDetails = { username, password };
        const apiUrl = 'https://apis.ccbp.in/login';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        };

        const fetchResponse = await fetch(apiUrl, options);
        response = fetchResponse;
        data = await fetchResponse.json();
      }
      
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token);
      } else {
        this.onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      // Fallback to mock API if real API fails
      try {
        const result = await mockApiService.login(username, password);
        if (result.ok) {
          this.onSubmitSuccess(result.data.jwt_token);
        } else {
          this.onSubmitFailure(result.data.error_msg);
        }
      } catch (mockError) {
        this.onSubmitFailure('Something went wrong. Please try again.');
      }
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, isLoading } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-form-container">
        <div className="login-container">
          <div className="login-image-container">
            <img
              src="https://res.cloudinary.com/dbnkhibzi/image/upload/v1753579075/WhatsApp_Image_2025-07-27_at_06.47.38_747f8fb7_ehsclf.jpg"
              alt="website login"
              className="login-image"
            />
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="form-content">
              <img
                src="https://res.cloudinary.com/dbnkhibzi/image/upload/v1753578429/WhatsApp_Image_2025-07-27_at_06.34.42_17a0f774_rqvd0r.jpg"
                className="login-website-logo"
                alt="website logo"
              />
              <h1 className="login-heading">Tasty Kitchens</h1>
              <p className="login-subheading">Login</p>
              <div className="input-container">{this.renderUsernameField()}</div>
              <div className="input-container">{this.renderPasswordField()}</div>
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
