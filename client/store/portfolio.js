import axios from "axios";

const GOT_PORTFOLIO = "GOT_PORTFOLIO";
const GOT_LATEST_VALUES = "GOT_LATEST_VALUES";
const BOUGHT_STOCK = "BOUGHT_STOCK";

require("../../secrets");

const portfolioState = {
  stocks: [],
  totalValue: 0
};

const gotPortfolio = portfolio => {
  return {
    type: GOT_PORTFOLIO,
    portfolio
  };
};

const gotLatestValues = portfolio => {
  return {
    type: GOT_LATEST_VALUES,
    portfolio
  };
};

const boughtStock = stock => {
  return {
    type: BOUGHT_STOCK,
    stock
  };
};

export const getPortfolio = () => async dispatch => {
  const { data } = await axios.get("/api/portfolio");
  dispatch(gotPortfolio(data));
};

export const getLatestValues = symbols => async dispatch => {
  let { data } = await axios.get(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${process.env.STOCK_API_TOKEN}`
  );
  console.log(data);

  let resdata = await axios.put("/api/portfolio", { data });
  console.log(resdata.data);
  dispatch(gotLatestValues(resdata.data));
};

const portfolioReducer = (state = portfolioState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        stocks: action.portfolio.stocks,
        totalValue: action.portfolio.value
      };
    case GOT_LATEST_VALUES:
      return {
        stocks: action.portfolio.stocks,
        totalValue: action.portfolio.value
      };
    default:
      return state;
  }
};

export default portfolioReducer;
