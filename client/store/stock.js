import axios from "axios";

const GET_STOCK_INFO = "GET_STOCK_INFO";

const stockState = {};

const gotStock = stock => ({ type: GET_STOCK_INFO, stock });

export const getStockInfo = symbol => async dispatch => {};
