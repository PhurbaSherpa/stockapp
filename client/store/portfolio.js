import axios from 'axios'

const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const UPDATE_CURRENT_VALUES = 'UPDATE_CURRENT_VALUES'
const BOUGHT_STOCK = 'BOUGHT_STOCK'
const UPDATE_STOCK = 'UPDATE_STOCK'
const DELETE_STOCK = 'DELETE_STOCK'

require('../../secrets')

const portfolioState = {
  stocks: [],
  portfolioValue: 0
}

const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

const gotLatestValues = portfolio => ({
  type: UPDATE_CURRENT_VALUES,
  portfolio
})

const boughtStock = stock => ({
  type: BOUGHT_STOCK,
  stock
})

const updatedStock = stock => ({
  type: UPDATE_STOCK,
  stock
})

const deletedStock = stock => ({
  type: DELETE_STOCK,
  stock
})

export const getPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateCurrentValues = symbols => async dispatch => {
  let res
  try {
    res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${
        process.env.STOCK_API_TOKEN
      }`
    )
  } catch (error) {
    return console.log(error)
  }

  try {
    let {data} = await axios.put('/api/portfolio/currentvalues', {
      data: res.data
    })
    dispatch(gotLatestValues(data))
  } catch (error) {
    console.log(error)
  }
}

export const addStock = (stock, quantity) => async dispatch => {
  try {
    const {data} = await axios.post('/api/portfolio', {stock, quantity})
    dispatch(boughtStock(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteStock = symbol => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/portfolio/${symbol}`)
    dispatch(deletedStock(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateShares = (stock, quantity) => async dispatch => {
  try {
    const {data} = await axios.put('/api/portfolio/quantity', {
      stock,
      quantity
    })
    dispatch(updatedStock(data))
  } catch (error) {
    console.log(error)
  }
}

const portfolioReducer = (state = portfolioState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      let portfolioValue = 0
      action.portfolio.forEach(stock => {
        portfolioValue += +stock.totalValue
      })
      portfolioValue = +portfolioValue.toFixed(2)
      return {
        stocks: action.portfolio,
        portfolioValue: portfolioValue
      }
    case UPDATE_CURRENT_VALUES:
      let newPortfolioValue = 0
      action.portfolio.forEach(stock => {
        newPortfolioValue += +stock.totalValue
      })
      newPortfolioValue = +newPortfolioValue.toFixed(2)
      return {
        stocks: action.portfolio,
        portfolioValue: newPortfolioValue
      }
    case BOUGHT_STOCK:
      let increasedPortfolioValue =
        state.portfolioValue + action.stock.totalValue
      return {
        stocks: [...state.stocks, action.stock],
        portfolioValue: increasedPortfolioValue
      }
    case UPDATE_STOCK:
      let copy = [...state.stocks]
      let updatedPortfolioValue = state.portfolioValue
      copy.forEach(stock => {
        if (stock.symbol === action.stock.symbol) {
          stock.totalShares = +action.stock.totalShares
          updatedPortfolioValue -= stock.totalValue
          stock.totalValue = +action.stock.totalValue
          updatedPortfolioValue += stock.totalValue
          updatedPortfolioValue = +updatedPortfolioValue.toFixed(2)
        }
      })
      return {
        stocks: copy,
        portfolioValue: updatedPortfolioValue
      }
    case DELETE_STOCK:
      let newStocks = [...state.stocks]
      let decreasedPortfolioValue = +(
        state.portfolioValue - action.stock.totalValue
      ).toFixed(2)
      newStocks.filter(stock => {
        return stock.symbol !== action.stock.symbol
      })
      return {totalValue: decreasedPortfolioValue, stocks: newStocks}
    default:
      return state
  }
}

export default portfolioReducer
