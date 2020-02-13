import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logIn, signUp } from "../store";
import { Link } from "react-router-dom";

const loginsignup = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="auth-form">
      <form onSubmit={handleSubmit} name={name}>
        {name === "signup" ? (
          <div className="inputContainer">
            <input
              placeholder="First Name"
              className="input"
              name="firstName"
              type="text"
            />
          </div>
        ) : null}
        {name === "signup" ? (
          <div className="inputContainer">
            <input
              placeholder="Last Name"
              className="input"
              name="lastName"
              type="text"
            />
          </div>
        ) : null}
        <div className="inputContainer">
          <input
            placeholder="Email"
            className="input"
            name="email"
            type="text"
          />
        </div>
        <div className="inputContainer">
          <input
            placeholder="Password"
            className="input"
            name="password"
            type="password"
          />
        </div>
        <div id="auth-container">
          <button id="auth-button" type="submit">
            {displayName}
          </button>
        </div>
        {name === "login" ? (
          <Link to="/signup">Don't have an account yet?</Link>
        ) : (
          <Link to="/login">Already have an account?</Link>
        )}
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (formName === "signup") {
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(signUp(email, password, firstName, lastName));
      } else {
        dispatch(logIn(email, password));
      }
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(loginsignup);
export const Signup = connect(mapSignup, mapDispatch)(loginsignup);

loginsignup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
