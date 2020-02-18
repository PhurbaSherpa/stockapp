import React from 'react'
import SingleTransaction from './singleTransaction'

export default function TransactionList(props) {
  return (
    <div id="transactions-container">
      <h2>Transactions</h2>
      <div id="transaction-headers">
        <span className="transaction-info">Date</span>
        <span className="transaction-info">Time</span>
        <span className="transaction-info">Action</span>
        <span className="transaction-info">Symbol</span>
        <span className="transaction-info">Shares</span>
        <span className="transaction-info">Price</span>
      </div>
      <div id="transaction-list">
        {props.transactions.map((transaction, index) => {
          return <SingleTransaction key={index} transaction={transaction} />
        })}
      </div>
    </div>
  )
}
