import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
  deleteStock,
  updateShares,
  increaseBalance,
  addSellTransaction
} from '../store'

const SingleSymbol = props => {
  const {
    increaseBalance,
    addSellTransaction,
    stock,
    deleteStock,
    updateShares
  } = props
  const [sharesToSell, setSharesToSell] = useState(0)

  useEffect(() => {
    setSharesToSell(0)
  }, [])

  const {symbol, totalShares, totalValue, status} = stock
  const price = +totalValue / +totalShares

  let color = 'grey'
  if (status === 'POSITIVE') {
    color = 'green'
  }
  if (status === 'NEGATIVE') {
    color = 'red'
  }
  return (
    <div className="singleSymbol">
      <div className="symbol-info">{symbol}</div>
      <div className="symbol-info">{totalShares}</div>
      <div className="symbol-info">${price.toFixed(2)}</div>
      <div className="symbol-info" style={{color: color}}>
        ${totalValue}
      </div>
      <div className="symbol-info">
        <button
          disabled={sharesToSell > totalShares || sharesToSell <= 0}
          id="sell-button"
          type="button"
          onClick={() => {
            if (+sharesToSell === totalShares) {
              deleteStock(symbol)
            } else {
              let negativeValue = 0 - sharesToSell
              updateShares(stock, negativeValue)
            }
            increaseBalance(price, sharesToSell)
            addSellTransaction(stock, sharesToSell)
            setSharesToSell(0)
          }}
        >
          SELL
        </button>
        <input
          className="symbol-info"
          type="number"
          max={`${totalShares}`}
          min="0"
          value={sharesToSell}
          onChange={event => {
            setSharesToSell(event.target.value)
          }}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  increaseBalance: (price, quantity) =>
    dispatch(increaseBalance(price, quantity)),
  addSellTransaction: (stock, quantity) =>
    dispatch(addSellTransaction(stock, quantity)),
  deleteStock: symbol => dispatch(deleteStock(symbol)),
  updateShares: (stock, quantity) => dispatch(updateShares(stock, quantity))
})

export default connect(null, mapDispatchToProps)(SingleSymbol)
