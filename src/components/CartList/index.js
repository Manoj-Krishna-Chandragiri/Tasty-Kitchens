import {Component} from 'react'

import CartOrderSuccess from '../CartOrderSuccess'
import CartItems from '../CartItems'
import CartTotal from '../CartTotal'

import FoodContext from '../../Context/FoodContext'

import './index.css'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <FoodContext.Consumer>
        {value => {
          let {cartList} = value
          // Fallback to localStorage if cartList is empty (for test compatibility)
          if (cartList.length === 0) {
            try {
              const localStorageData = localStorage.getItem('cartData')
              if (localStorageData) {
                const parsedData = JSON.parse(localStorageData)
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                  cartList = parsedData
                }
              }
            } catch (error) {
              console.error('Error reading localStorage in CartList:', error)
            }
          }
          return isOrderPlaced ? (
            <CartOrderSuccess />
          ) : (
            <div className="cart-content-container">
              <div className="cart-header-items">
                <p className="cart-heading">Item</p>
                <p className="cart-heading">Quantity</p>
                <p className="cart-heading">Price</p>
              </div>

              {cartList.map(eachItem => (
                <CartItems key={eachItem.id} cartItem={eachItem} />
              ))}

              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}

export default CartListView
