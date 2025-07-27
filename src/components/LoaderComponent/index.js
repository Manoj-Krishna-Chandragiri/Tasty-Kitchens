import React from 'react';
import './index.css';

const LoaderComponent = ({ testId = 'loader' }) => (
  <div className="loader-container" testid={testId}>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoaderComponent;
