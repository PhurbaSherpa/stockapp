import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, Home, Transaction} from './components'
import {me} from './store'
import UserProfile from './components/userProfile'

const Routes = props => {
  useEffect(
    () => {
      props.loadInitialData()
    },
    [props.isLoggedIn]
  )
  const {isLoggedIn} = props
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          <Route path="/profile" component={UserProfile} />
          <Route path="/portfolio" component={Home} />
          <Route path="/transactions" component={Transaction} />
          <Route component={Home} />
        </Switch>
      )}
      <Route component={Login} />
    </Switch>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
