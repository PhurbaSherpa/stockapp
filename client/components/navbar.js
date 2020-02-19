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
          PORTFOLIO
        </Link>
        <Link className="navlink-in" to="/transactions">
          TRANSACTIONS
        </Link>
        <a className="navlink-in" href="#" onClick={handleClick}>
          LOGOUT
        </a>
      </nav>
    ) : null}
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
