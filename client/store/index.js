import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import portfolio from './portfolio'
import marketStatus from './marketStatus'
import stockToBuy from './stockToBuy'
import transactions from './transaction'

const reducer = combineReducers({
  user,
  portfolio,
  marketStatus,
  stockToBuy,
  transactions
})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './portfolio'
export * from './marketStatus'
export * from './stockToBuy'
export * from './transaction'
