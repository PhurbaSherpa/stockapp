import React from 'react'
import {connect} from 'react-redux'

const UserProfile = props => {
  const {firstName, lastName, email, balance} = props.user
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
      <div id="deposit-box" />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(UserProfile)
