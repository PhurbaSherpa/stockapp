import React, {useState} from 'react'
import {connect} from 'react-redux'
import {
  addStock,
  getStockInfo,
  updateShares,
  decreaseBalance,
  addBuyTransaction
} from '../store'

const BuyBox = props => {
  const [tickerSymbol, setTickerSymbol] = useState('')
  const [quantity, setQuantity] = useState(1)

  const {
    marketStatus,
    getStockInfo,
    stock,
    searchError,
    addStock,
    ownedSymbols,
    updateShares,
    decreaseBalance,
    balance,
    addBuyTransaction
  } = props
  let color = 'grey'
  if (stock.open > stock.latestPrice) {
    color = 'red'
  } else if (stock.open < stock.latestPrice) {
    color = 'green'
  }

  return (
    <div id="buy-container">
      <h2>MY CASH: ${(+props.balance).toFixed(2)}</h2>
      <div id="stock-info">
        <div id="marketStatus">Market Status: {marketStatus.toUpperCase()}</div>
        <div>Symbol: {stock.symbol}</div>
        <div style={{color: color}} id="stock-latestPrice">
          Latest Price: ${stock.latestPrice}
        </div>
      </div>
      <form id="buy-form">
        <input
          className="buy-box-input"
          placeholder="Ticker Symbol"
          name="symbol"
          type="text"
          onChange={event => {
            if (event.target.value !== '') {
              getStockInfo(event.target.value)
            }
            setTickerSymbol(event.target.value)
          }}
        />
        <input
          className="buy-box-input"
          placeholder="Quantity"
          name="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={event => {
            setQuantity(event.target.value)
          }}
        />
        {searchError ? <div className="error">{searchError}</div> : null}
        {quantity !== '' && quantity <= 0 ? (
          <div className="error">Quantity must be greater than 0</div>
        ) : null}
        <div id="buy-button-container">
          <div id="total">
            Total: $
            {stock.latestPrice ? (stock.latestPrice * quantity).toFixed(2) : 0}
          </div>
          <button
            className="buy-button"
            type="button"
            disabled={
              tickerSymbol === '' ||
              !!searchError ||
              quantity <= 0 ||
              balance < stock.latestPrice * quantity
            }
            onClick={() => {
              if (quantity > 0) {
                if (ownedSymbols.includes(stock.symbol)) {
                  updateShares(stock, quantity)
                } else {
                  addStock(stock, quantity)
                }
                decreaseBalance(stock.latestPrice, quantity)
                addBuyTransaction(stock, quantity)
              }
            }}
          >
            BUY
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  marketStatus: state.marketStatus,
  stock: state.stockToBuy,
  searchError: state.stockToBuy.error,
  ownedSymbols: state.portfolio.stocks.map(stock => stock.symbol),
  balance: state.user.balance
})

const mapDispatchToProps = dispatch => {
  return {
    addStock: (stock, quantity) => dispatch(addStock(stock, quantity)),
    updateShares: (stock, quantity) => dispatch(updateShares(stock, quantity)),
    getStockInfo: symbol => dispatch(getStockInfo(symbol)),
    decreaseBalance: (price, quantity) =>
      dispatch(decreaseBalance(price, quantity)),
    addBuyTransaction: (stock, quantity) =>
      dispatch(addBuyTransaction(stock, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyBox)
