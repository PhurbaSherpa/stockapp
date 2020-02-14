import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup, Home } from "./components";
import { me } from "./store";

const Routes = props => {
  useEffect(() => {
    props.loadInitialData;
  }, [isLoggedIn]);
  const { isLoggedIn } = props;
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
      )}
      <Route component={Login} />
    </Switch>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
