import './index.css'

const Counter = props => {
  const {foodId, quantity, increaseQuantity, decreaseQuantity} = props

  const onDecrement = () => {
    decreaseQuantity(foodId)
  }

  const onIncrement = () => {
    increaseQuantity(foodId)
  }

  return (
    <div className="cart-quantity-container">
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
  )
}

export default Counter
