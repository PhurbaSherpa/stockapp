import React from 'react'
import SingleTransaction from './singleTransaction'

export default function TransactionList(props) {
  return (
    <div id="transactions-container">
      <h2 id="transaction-title">Transactions</h2>
      <div id="transaction-headers">
        <span className="transaction-info-head">Date</span>
        <span className="transaction-info-head">Time</span>
        <span className="transaction-info-head">Action</span>
        <span className="transaction-info-head">Symbol</span>
        <span className="transaction-info-head">Shares</span>
        <span className="transaction-info-head">Price</span>
      </div>
      <div id="transaction-list">
        {props.transactions.map((transaction, index) => {
          return <SingleTransaction key={index} transaction={transaction} />
        })}
      </div>
    </div>
  )
}
