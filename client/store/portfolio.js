import axios from "axios";

const GOT_PORTFOLIO = "GOT_PORTFOLIO";

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

export const getPortfolio = () => async dispatch => {
  const { data } = await axios.get("/api/portfolio");
  dispatch(gotPortfolio(data));
};

const portfolioReducer = (state = portfolioState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        stocks: action.portfolio.stocks,
        totalValue: action.portfolio.value
      };
    default:
      return state;
  }
};

export default portfolioReducer;
