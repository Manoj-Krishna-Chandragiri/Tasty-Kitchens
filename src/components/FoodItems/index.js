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
          const {increaseQuantity, decreaseQuantity, addCartItem, cartList} =
            value
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
            <li className="food-list" testid="foodItem">
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
                      testid="decrement-count"
                      onClick={onDecreaseQuantity}
                    >
                      <BsDashSquare className="quantity-icon" />
                    </button>
                    <p className="active-count" testid="active-count">
                      {quantity}
                    </p>
                    <button
                      type="button"
                      className="increment-count"
                      testid="increment-count"
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
