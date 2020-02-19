import axios from 'axios'

const GOT_STOCK_INFO = 'GOT_STOCK_INFO'
const GOT_ERROR = 'GOT_ERROR'

const stockState = {
  symbol: '',
  openPrice: 0,
  latestPrice: 0
}

const gotStockInfo = stock => ({type: GOT_STOCK_INFO, stock})

const gotError = error => ({
  type: GOT_ERROR,
  error
})

export const getStockInfo = symbol => async dispatch => {
  try {
    let {data} = await axios.get(`/api/quote/${symbol}`)
    dispatch(gotStockInfo(data.quote))
  } catch (error) {
    dispatch(gotError({error: `Can\'t find this ticker symbol`}))
  }
}

const stockReducer = (state = stockState, action) => {
  switch (action.type) {
    case GOT_STOCK_INFO:
      let openPrice = action.stock.open
      if (!action.stock.open) {
        openPrice = action.stock.previousClose
      }
      return {
        symbol: action.stock.symbol,
        latestPrice: action.stock.latestPrice,
        openPrice: openPrice
      }
    case GOT_ERROR:
      return action.error
    default:
      return state
  }
}

export default stockReducer
