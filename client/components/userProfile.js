import React, {useState} from 'react'
import {connect} from 'react-redux'
import {deposit} from '../store'
import StripeCheckout from 'react-stripe-checkout'

const UserProfile = props => {
  const {firstName, lastName, email, balance} = props.user

  const [depositAmount, setDepositAmount] = useState(0)

  return (
    <div id="profile-container">
      <div id="profile-info-container">
        <div className="profile-info">
          <div>First Name:</div>
          <div>{firstName}</div>
        </div>
        <div className="profile-info">
          <div>Last Name:</div>
          <div>{lastName}</div>
        </div>
        <div className="profile-info">
          <div>Email:</div>
          <div>{email}</div>
        </div>
        <div className="profile-info">
          <div>Balance:</div>
          <div>${balance}</div>
        </div>
      </div>
      <div id="deposit-box">
        <input
          placeholder="Deposit Amount"
          type="number"
          min="0"
          onChange={event => {
            setDepositAmount(event.target.value)
          }}
        />
        <StripeCheckout
          token={() => {
            if (depositAmount > 0) {
              props.deposit(depositAmount)
            }
          }}
          stripeKey="pk_test_8Y1YW5Xc6CRwnshovcOuNc9g"
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  deposit: amount => dispatch(deposit(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
