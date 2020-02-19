import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getPortfolio, updateCurrentValues, getMarketStatus, me} from '../store'
import BuyBox from './buyBox'
import OwnedStockList from './ownedStockList'

const HomePortfolio = props => {
  useEffect(
    () => {
      fetchData()
      let symbols = props.stocks
        .map(stock => {
          return stock.symbol
        })
        .join(',')

      let interval = setInterval(() => {
        if (props.marketStatus === 'closed' || !props.isLoggedIn) {
          clearInterval(interval)
        }
        props.updateCurrentValues(symbols)
      }, 5000)
      async function fetchData() {
        await props.getPortfolio()
        await props.getMarketStatus()
        await props.me()
      }
      return () => clearInterval(interval)
    },
    [props.portfolioValue, props.marketStatus, props.isLoggedIn]
  )

  return (
    <div>
      <h2 id="portfolio-value">
        Portfolio: ${(+props.portfolioValue).toFixed(2)}
      </h2>
      <div id="home-container">
        <OwnedStockList stocks={props.stocks} />
        <BuyBox />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stocks: state.portfolio.stocks,
    portfolioValue: state.portfolio.portfolioValue,
    balance: state.user.balance,
    marketStatus: state.marketStatus,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio()),
    updateCurrentValues: symbols => dispatch(updateCurrentValues(symbols)),
    getMarketStatus: () => dispatch(getMarketStatus()),
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio)
