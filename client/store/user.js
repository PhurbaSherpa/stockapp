import axios from "axios";
import history from "../history";

const GOT_USER = "GOT_USER";
const REMOVE_USER = "REMOVE_USER";
const DECREASE_BALANCE = "DECREASE_BALANCE";
const INCREASE_BALANCE = "INCREASE_BALANCE";

const defaultUser = {};

const gotUser = user => ({ type: GOT_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const decreasedBalance = user => ({ type: DECREASE_BALANCE, user });
const increasedBalance = user => ({ type: INCREASE_BALANCE, user });

export const decreaseBalance = (price, quantity) => async dispatch => {
  try {
    const { data } = await axios.put("/api/balance/decrease", {
      price,
      quantity
    });
    dispatch(decreasedBalance(data));
  } catch (error) {
    console.log(err);
  }
};

export const increaseBalance = (price, quantity) => async dispatch => {
  try {
    const { data } = await axios.put("/api/balance/increase", {
      price,
      quantity
    });
    dispatch(increasedBalance(data));
  } catch (error) {
    console.log(err);
  }
};

export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(gotUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }

  try {
    dispatch(gotUser(res.data));
    history.push("/portfolio");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logIn = (email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/login`, { email, password });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }

  try {
    dispatch(gotUser(res.data));
    history.push("/portfolio");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const signUp = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/signup`, {
      email,
      password,
      firstName,
      lastName
    });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }

  try {
    dispatch(gotUser(res.data));
    history.push("/portfolio");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case DECREASE_BALANCE:
      return { ...state };
    case INCREASE_BALANCE:
      return { ...state };
    default:
      return state;
  }
}
