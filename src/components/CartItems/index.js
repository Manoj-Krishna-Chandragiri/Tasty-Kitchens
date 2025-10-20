import {FaRupeeSign} from 'react-icons/fa'
import FoodContext from '../../Context/FoodContext'
import './index.css'

const CartItems = props => (
  <FoodContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {cartItem} = props
      const {id, name, cost, quantity, imageUrl} = cartItem
      const itemPrice = cost * quantity

      const onDecrement = () => {
        decreaseQuantity(id)
      }

      const onIncrement = () => {
        increaseQuantity(id)
      }

      return (
        <li className="cart-items-list-container" testid="cartItem">
          <img className="cart-img" alt={name} src={imageUrl} />
          <h1 className="item-title">{name}</h1>

          <div className="quantity-controls-container">
            {/* INLINED COUNTER LOGIC */}
            <button
              type="button"
              className="quantity-button"
              testid="decrement-quantity"
              onClick={onDecrement}
            >
              -
            </button>
            <p className="food-quantity" testid="item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-button"
              testid="increment-quantity"
              onClick={onIncrement}
            >
              +
            </button>
          </div>
          {/* END INLINED COUNTER LOGIC */}

          <p className="cart-item-price" testid="item-cost">
            <FaRupeeSign />
            {itemPrice}.00
          </p>
        </li>
      )
    }}
  </FoodContext.Consumer>
)

export default CartItems
