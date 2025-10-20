import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import FoodContext from '../../Context/FoodContext'

import './index.css'

class FoodItems extends Component {
  render() {
    return (
      <FoodContext.Consumer>
        {value => {
<<<<<<< HEAD
          const {increaseQuantity, decreaseQuantity, addCartItem, cartList} =
            value
=======
          const {
            increaseQuantity,
            decreaseQuantity,
            addCartItem,
            cartList,
          } = value
>>>>>>> 63573d9390cc98368ff2ac83efa2b13d9a61f628
          const {itemDetails} = this.props
          const {id, imageUrl, name, cost, rating} = itemDetails

          // Find the quantity from cart list
          const cartItem = cartList.find(item => item.id === id)
          const quantity = cartItem ? cartItem.quantity : 0

          const onClickAddButton = () => {
            addCartItem({...itemDetails, quantity: 1})
          }

          const onDecreaseQuantity = () => {
            decreaseQuantity(id)
          }

          const onIncreaseQuantity = () => {
            increaseQuantity(id)
          }

          return (
<<<<<<< HEAD
            <li className="food-list" testid="foodItem">
=======
            <li className="food-list" data-testid="foodItem">
>>>>>>> 63573d9390cc98368ff2ac83efa2b13d9a61f628
              <img src={imageUrl} alt={name} className="food-image" />
              <div className="food-details">
                <h1 className="food-name">{name}</h1>
                <div className="cost-div">
                  <BiRupee />
                  <p className="food-cost">{cost}</p>
                </div>
                <div className="food-rating-div">
                  <FaStar color="#FFCC00" />
                  <p className="food-rating">{rating}</p>
                </div>

                {quantity === 0 ? (
                  <button
                    type="button"
                    className="food-add-btn"
                    onClick={onClickAddButton}
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-quantity">
                    <button
                      type="button"
                      className="decrement-count"
<<<<<<< HEAD
                      testid="decrement-count"
=======
                      data-testid="decrement-count"
>>>>>>> 63573d9390cc98368ff2ac83efa2b13d9a61f628
                      onClick={onDecreaseQuantity}
                    >
                      <BsDashSquare className="quantity-icon" />
                    </button>
<<<<<<< HEAD
                    <p className="active-count" testid="active-count">
=======
                    <p className="active-count" data-testid="active-count">
>>>>>>> 63573d9390cc98368ff2ac83efa2b13d9a61f628
                      {quantity}
                    </p>
                    <button
                      type="button"
                      className="increment-count"
<<<<<<< HEAD
                      testid="increment-count"
=======
                      data-testid="increment-count"
>>>>>>> 63573d9390cc98368ff2ac83efa2b13d9a61f628
                      onClick={onIncreaseQuantity}
                    >
                      <BsPlusSquare className="quantity-icon" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </FoodContext.Consumer>
    )
  }
}
export default FoodItems
