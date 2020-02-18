import React from 'react'
import SingleSymbol from './singleSymbol'

export default function OwnedStockList(props) {
  return (
    <div id="symbols-list">
      <div id="symbol-list-headers">
        <span className="symbol-info">Symbol</span>
        <span className="symbol-info">Shares</span>
        <span className="symbol-info">Price/Share</span>
        <span className="symbol-info">TotalValue</span>
      </div>
      <div id="portfolio-symbols">
        {props.stocks.length > 0 ? (
          props.stocks.map((stock, index) => {
            return <SingleSymbol key={index} stock={stock} />
          })
        ) : (
          <div>No Stocks Owned</div>
        )}
      </div>
    </div>
  )
}
