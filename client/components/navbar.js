import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <h1>StockTrader</h1>
    {isLoggedIn ? (
      <nav className="navlinks">
        <Link className="navlink-in" to="/portfolio">
          Portfolio
        </Link>
        <Link className="navlink-in" to="/transactions">
          Transactions
        </Link>
        <a className="navlink-in" href="#" onClick={handleClick}>
          Logout
        </a>
      </nav>
    ) : (
      <nav className="navlinks">
        <Link className="navlink-out" to="/login">
          LOGIN
        </Link>
        <Link className="navlink-out" to="/signup">
          SIGNUP
        </Link>
      </nav>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
