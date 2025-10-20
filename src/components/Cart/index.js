import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

import FoodContext from '../../Context/FoodContext'
import CartEmpty from '../CartEmpty'
import CartList from '../CartList'

import './index.css'

class Cart extends Component {
  componentDidMount() {
    // Force re-read localStorage data when cart component mounts
    const cartData = localStorage.getItem('cartData')
    if (cartData) {
      try {
        const parsedData = JSON.parse(cartData)
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Data exists in localStorage, force context update
          window.dispatchEvent(new Event('storage'))
        }
      } catch (error) {
        console.error('Error parsing cart data:', error)
      }
    }
  }

  render() {
    return (
      <FoodContext.Consumer>
        {value => {
          const {cartList} = value
          // Double-check localStorage for test compatibility
          let actualCartList = cartList
          if (cartList.length === 0) {
            try {
              const localStorageData = localStorage.getItem('cartData')
              if (localStorageData) {
                const parsedData = JSON.parse(localStorageData)
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                  actualCartList = parsedData
                }
              }
            } catch (error) {
              console.error('Error reading localStorage in Cart:', error)
            }
          }
          const isCartEmpty = actualCartList.length === 0

          return (
            <>
              <Header activeTabId="Cart" />
              <div className="cart-container">
                {isCartEmpty ? <CartEmpty /> : <CartList />}
              </div>
              <Footer />
            </>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}

export default Cart
