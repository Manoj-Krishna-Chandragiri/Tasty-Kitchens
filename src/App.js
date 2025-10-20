import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantInfo from './components/RestaurantInfo'
import NotFound from './components/NotFound'
import FoodContext from './Context/FoodContext'

import './App.css'

const getCartDataFromLocalStorage = () => {
  try {
    const stringifiedData = localStorage.getItem('cartData')
    if (stringifiedData === null || stringifiedData === undefined) {
      return []
    }
    const parsedData = JSON.parse(stringifiedData)
    return Array.isArray(parsedData) ? parsedData : []
  } catch (error) {
    console.error('Error parsing cart data from localStorage:', error)
    return []
  }
}

class App extends Component {
  state = {cartList: getCartDataFromLocalStorage()}

  componentDidMount() {
    // Refresh cart data from localStorage on mount and listen for storage changes
    const cartData = getCartDataFromLocalStorage()
    this.setState({cartList: cartData})

    // Listen for localStorage changes (useful for testing)
    window.addEventListener('storage', this.handleStorageChange)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange = () => {
    const cartData = getCartDataFromLocalStorage()
    this.setState({cartList: cartData})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
    localStorage.setItem('cartData', JSON.stringify([]))
  }

  increaseQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      () => {
        const {cartList} = this.state
        localStorage.setItem('cartData', JSON.stringify(cartList))
      },
    )
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity - 1
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }),
        () => {
          const {cartList: updatedCartList} = this.state
          localStorage.setItem('cartData', JSON.stringify(updatedCartList))
        },
      )
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
    localStorage.setItem('cartData', JSON.stringify(updatedCartList))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = product.quantity

              return {...eachCartItem, quantity: updatedQuantity}
            }

            return eachCartItem
          }),
        }),
        () => {
          const {cartList: updatedCartList} = this.state
          localStorage.setItem('cartData', JSON.stringify(updatedCartList))
        },
      )
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <FoodContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantInfo}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </FoodContext.Provider>
    )
  }
}
export default App
