import axios from "axios";

const GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS";
const ADD_TRANSACTION = "ADD_TRANSACTION";

const transactionsState = [];

const gotAllTransactions = transactions => ({
  type: GET_ALL_TRANSACTIONS,
  transactions
});

const addedTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
});

export const getAllTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/transaction");
    dispatch(gotAllTransactions(data));
  } catch (error) {
    console.log(error);
  }
};

export const addBuyTransaction = (stock, quantity) => async dispatch => {
  try {
    const { data } = await axios.post("/api/transaction/buy", {
      stock,
      quantity
    });
    dispatch(addedTransaction(data));
  } catch (error) {
    console.log(error);
  }
};

const transactionReducer = (state = transactionsState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return action.transactions;
    case ADD_TRANSACTION:
      return [...state, action.transaction];
    default:
      return state;
  }
};

export default transactionReducer;
