import React from 'react'
import {connect} from 'react-redux'
import {logIn, signUp} from '../store'
import {Link} from 'react-router-dom'

const LoginSignup = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth-form-container">
      <form id="auth-form" onSubmit={handleSubmit} name={name}>
        <div id="auth-type">{name === 'signup' ? 'SIGNUP' : 'LOGIN'}</div>

        {name === 'signup' ? (
          <div className="inputContainer">
            <input placeholder="First Name" name="firstName" type="text" />
          </div>
        ) : null}
        {name === 'signup' ? (
          <div className="inputContainer">
            <input placeholder="Last Name" name="lastName" type="text" />
          </div>
        ) : null}
        <div className="inputContainer">
          <input placeholder="Email" name="email" type="text" />
        </div>
        <div className="inputContainer">
          <input placeholder="Password" name="password" type="password" />
        </div>
        <div id="auth-button-container">
          <button id="auth-button" type="submit">
            {displayName.toUpperCase()}
          </button>
        </div>
        {name === 'login' ? (
          <Link to="/signup">Don't have an account yet?</Link>
        ) : (
          <Link to="/login">Already have an account?</Link>
        )}
        <a id="google" href="/auth/google">
          {displayName} with Google
        </a>
        {error &&
          error.response && (
            <div className="error"> {error.response.data} </div>
          )}
      </form>
      <div id="preview">placeholder</div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(signUp(email, password, firstName, lastName))
      } else {
        dispatch(logIn(email, password))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginSignup)
export const Signup = connect(mapSignup, mapDispatch)(LoginSignup)
