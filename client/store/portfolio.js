import axios from "axios";

const GOT_PORTFOLIO = "GOT_PORTFOLIO";
const GOT_LATEST_VALUES = "GOT_LATEST_VALUES";
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
  type: GOT_LATEST_VALUES,
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
  const { data } = await axios.get("/api/portfolio");
  dispatch(gotPortfolio(data));
};

export const getLatestValues = symbols => async dispatch => {
  symbols = symbols
    .map(stock => {
      return stock.symbol;
    })
    .join(",");
  let { data } = await axios.get(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${process.env.STOCK_API_TOKEN}`
  );
  let resdata = await axios.put("/api/portfolio/currentvalues", { data });
  dispatch(gotLatestValues(resdata.data));
};

export const addStock = (stock, quantity) => async dispatch => {
  const { data } = await axios.post("/api/portfolio", { stock, quantity });
  dispatch(boughtStock(data));
};

export const addShares = (stock, quantity) => async dispatch => {
  const { data } = await axios.put("/api/portfolio/quantity", {
    stock,
    quantity
  });
  dispatch(updatedStock(data));
};

const portfolioReducer = (state = portfolioState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        stocks: action.portfolio.stocks,
        portfolioValue: action.portfolio.value
      };
    case GOT_LATEST_VALUES:
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
