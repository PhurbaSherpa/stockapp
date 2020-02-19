import React from 'react'

export default function SingleTransaction(props) {
  const {action, symbol, price, shares, createdAt} = props.transaction

  let date = createdAt.slice(0, 10)
  let time = createdAt.slice(11, createdAt.length - 2)

  return (
    <div id="singleTransaction">
      <div className="transaction-info">{date}</div>
      <div className="transaction-info">{time}</div>
      <div className="transaction-info" style={{fontWeight: 600}}>
        {action}
      </div>
      <div className="transaction-info">{symbol}</div>
      <div className="transaction-info">{shares} shares</div>
      <div className="transaction-info">@ ${price}</div>
    </div>
  )
}
