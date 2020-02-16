import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPortfolio,
  updateCurrentValues,
  getMarketStatus,
  me
} from "../store";
import SingleSymbol from "./singleSymbol";
import BuySellBox from "./buysellbox";

const HomePortfolio = props => {
  useEffect(() => {
    fetchData();
    let symbols = props.stocks
      .map(stock => {
        return stock.symbol;
      })
      .join(",");
    if (props.marketStatus === "open") {
      let interval = setInterval(() => {
        if (props.market === "closed") {
          clearInterval(interval);
        }
        props.updateCurrentValues(symbols);
      }, 5000);
    }
    async function fetchData() {
      await props.getPortfolio();
      await props.getMarketStatus();
      await props.me();
    }
  }, [props.portfolioValue, props.marketStatus]);

  return (
    <div id="home-Conatiner">
      <h2>Portfolio: ${props.portfolioValue}</h2>
      <div id="symbol-buy-container">
        <div id="portfolio-symbols">
          {props.stocks.length > 0 ? (
            props.stocks.map((stock, index) => {
              return <SingleSymbol key={index} stock={stock} />;
            })
          ) : (
            <div>No Stocks Owned</div>
          )}
        </div>
        <div id="vertical-line"></div>
        <div id="buy-sell-container">
          <h2>Cash ${props.balance}</h2>
          <BuySellBox />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    stocks: state.portfolio.stocks,
    portfolioValue: state.portfolio.portfolioValue,
    balance: state.user.balance,
    marketStatus: state.marketStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio()),
    updateCurrentValues: symbols => dispatch(updateCurrentValues(symbols)),
    getMarketStatus: () => dispatch(getMarketStatus()),
    me: () => dispatch(me())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio);
