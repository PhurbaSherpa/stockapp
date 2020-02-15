import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import portfolio from "./portfolio";
import marketStatus from "./marketStatus";
import stockToBuy from "./stockToBuy";

const reducer = combineReducers({ user, portfolio, marketStatus, stockToBuy });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./portfolio";
export * from "./marketStatus";
export * from "./stockToBuy";
