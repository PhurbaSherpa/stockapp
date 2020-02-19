import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAllTransactions, me} from '../store'
import TransactionList from './transactionList'
import BuyBox from './buyBox'

const Transactions = props => {
  useEffect(
    () => {
      props.getAllTransactions()
      props.me()
    },
    [props.transactions.length]
  )

  return (
    <div id="transaction-buybox">
      <TransactionList transactions={props.transactions} />
      <BuyBox />
    </div>
  )
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  getAllTransactions: () => dispatch(getAllTransactions()),
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
