import {Component} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetail from './components/RestaurantDetail'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import TastyKitchensContext from './context/TastyKitchensContext'

import './App.css'

const getCartDetail = () => {
  const localCartItem = JSON.parse(localStorage.getItem('cart_detail'))
  return localCartItem || []
}

class App extends Component {
  state = {cartItem: getCartDetail()}

  setCartToLocal = () => {
    const {cartItem} = this.state
    localStorage.setItem('cart_detail', JSON.stringify(cartItem))
  }

  increaseItem = id => {
    const {cartItem} = this.state
    const updatedQuantityCart = cartItem.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )
    this.setState({cartItem: updatedQuantityCart}, this.setCartToLocal)
  }

  decreaseItem = id => {
    const {cartItem} = this.state
    const itemDetail = cartItem.find(eachItem => eachItem.id === id)
    if (itemDetail.quantity > 1) {
      const updatedQuantityCart = cartItem.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, quantity: eachItem.quantity - 1}
          : eachItem,
      )
      this.setState({cartItem: updatedQuantityCart}, this.setCartToLocal)
    } else {
      this.removeItemFromCart(id)
    }
  }

  addItemToCart = item => {
    const {cartItem} = this.state
    const isItemExist = cartItem.find(eachItem => eachItem.id === item.id)

    if (isItemExist) {
      const updatedCart = cartItem.map(eachItem =>
        eachItem.id === isItemExist.id
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      )
      this.setState({cartItem: updatedCart}, this.setCartToLocal)
    } else {
      this.setState(
        prevState => ({
          cartItem: [...prevState.cartItem, {...item, quantity: 1}],
        }),
        this.setCartToLocal,
      )
    }
  }

  removeItemFromCart = id => {
    const {cartItem} = this.state
    const filteredCartItem = cartItem.filter(eachItem => eachItem.id !== id)
    this.setState({cartItem: filteredCartItem}, this.setCartToLocal)
  }

  clearCart = () => {
    this.setState({cartItem: []}, this.setCartToLocal)
  }

  render() {
    const {cartItem} = this.state
    return (
      <TastyKitchensContext.Provider
        value={{
          cartItem,
          addItemToCart: this.addItemToCart,
          increaseItem: this.increaseItem,
          decreaseItem: this.decreaseItem,
          clearCart: this.clearCart,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant/:id"
              element={
                <ProtectedRoute>
                  <RestaurantDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </BrowserRouter>
      </TastyKitchensContext.Provider>
    )
  }
}

export default App
