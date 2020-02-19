import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getMarketStatus} from '../store'

const Navbar = ({handleClick, isLoggedIn, marketStatus, getMarketStatus}) => {
  let color
  useEffect(
    () => {
      fetchData()
      async function fetchData() {
        await getMarketStatus()
      }
    },
    [marketStatus]
  )

  if (marketStatus === 'closed') {
    color = 'red'
  } else {
    color = 'green'
  }
  return (
    <div id="navbar">
      <h1>StockTrader</h1>
      {isLoggedIn ? (
        <nav className="navlinks">
          <Link className="navlink-in" to="/profile">
            PROFILE/DEPOSIT
          </Link>
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
      ) : (
        <div id="market-status">
          MARKET STATUS:{' '}
          <span style={{color: color}}>{marketStatus.toUpperCase()}</span>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  marketStatus: state.marketStatus
})

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  },
  getMarketStatus: () => dispatch(getMarketStatus())
})

export default connect(mapState, mapDispatch)(Navbar)
