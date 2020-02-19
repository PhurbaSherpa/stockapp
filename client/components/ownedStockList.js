import React from 'react'
import SingleSymbol from './singleSymbol'

export default function OwnedStockList(props) {
  let sortedstocks = props.stocks.sort((a, b) => {
    return b.totalValue - a.totalValue
  })

  return (
    <div id="symbols-list">
      <div id="symbol-list-headers">
        <span className="symbol-info-header">Symbol</span>
        <span className="symbol-info-header">Shares</span>
        <span className="symbol-info-header">Price/Share</span>
        <span className="symbol-info-header">TotalValue</span>
      </div>
      <div id="portfolio-symbols">
        {sortedstocks.length > 0 ? (
          sortedstocks.map((stock, index) => {
            return <SingleSymbol key={index} stock={stock} />
          })
        ) : (
          <div id="nostocks">No Stocks Owned</div>
        )}
      </div>
    </div>
  )
}
