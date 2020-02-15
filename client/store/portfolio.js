import axios from "axios";

const GOT_PORTFOLIO = "GOT_PORTFOLIO";
const UPDATE_CURRENT_VALUES = "UPDATE_CURRENT_VALUES";
const BOUGHT_STOCK = "BOUGHT_STOCK";
const UPDATE_STOCK = "UPDATE_STOCK";

require("../../secrets");

const portfolioState = {
  stocks: [],
  portfolioValue: 0
};

const gotPortfolio = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
});

const gotLatestValues = portfolio => ({
  type: UPDATE_CURRENT_VALUES,
  portfolio
});

const boughtStock = stock => ({
  type: BOUGHT_STOCK,
  stock
});

const updatedStock = stock => ({
  type: UPDATE_STOCK,
  stock
});

export const getPortfolio = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/portfolio");
    dispatch(gotPortfolio(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentValues = symbols => async dispatch => {
  console.log("thesymbols", symbols);

  let res;
  try {
    res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${process.env.STOCK_API_TOKEN}`
    );
  } catch (error) {
    return console.log("gettingData", error);
  }

  try {
    let { data } = await axios.put("/api/portfolio/currentvalues", {
      data: res.data
    });
    dispatch(gotLatestValues(data));
  } catch (error) {
    console.log(error);
  }
};

export const addStock = (stock, quantity) => async dispatch => {
  try {
    const { data } = await axios.post("/api/portfolio", { stock, quantity });
    dispatch(boughtStock(data));
  } catch (error) {
    console.log(error);
  }
};

export const addShares = (stock, quantity) => async dispatch => {
  try {
    const { data } = await axios.put("/api/portfolio/quantity", {
      stock,
      quantity
    });
    dispatch(updatedStock(data));
  } catch (error) {
    console.log(errro);
  }
};

const portfolioReducer = (state = portfolioState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        stocks: action.portfolio.stocks,
        portfolioValue: action.portfolio.value
      };
    case UPDATE_CURRENT_VALUES:
      return {
        stocks: action.portfolio.stocks,
        portfolioValue: action.portfolio.value
      };
    case BOUGHT_STOCK:
      let newPortfolioValue = state.portfolioValue + action.stock.totalValue;
      return {
        stocks: [...state.stocks, action.stock],
        portfolioValue: newPortfolioValue
      };
    case UPDATE_STOCK:
      let copy = [...state.stocks];
      let portfolioValue = state.portfolioValue;
      copy.forEach(stock => {
        if (stock.symbol === action.stock.symbol) {
          stock.totalShares = +action.stock.totalShares;
          portfolioValue -= stock.totalValue;
          stock.totalValue = +action.stock.totalValue;
          portfolioValue += stock.totalValue;
        }
      });
      return {
        stocks: copy,
        portfolioValue: portfolioValue
      };
    default:
      return state;
  }
};

export default portfolioReducer;
