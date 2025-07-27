import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Home from './components/Home';
import RestaurantDetails from './components/RestaurantDetails';
import Cart from './components/Cart';
import Orders from './components/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

export const sortByOptions = [
  {
    id: 'Rating-High-Low',
    displayText: 'Rating (High to Low)',
    value: 'Rating (High to Low)',
  },
  {
    id: 'Rating-Low-High',
    displayText: 'Rating (Low to High)',
    value: 'Rating (Low to High)',
  },
  {
    id: 'A-Z',
    displayText: 'Name (A-Z)',
    value: 'A-Z',
  },
  {
    id: 'Z-A',
    displayText: 'Name (Z-A)',
    value: 'Z-A',
  },
  {
    id: 'Most-Reviews',
    displayText: 'Most Reviews',
    value: 'Most Reviews',
  },
  {
    id: 'Least-Reviews',
    displayText: 'Least Reviews',
    value: 'Least Reviews',
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
