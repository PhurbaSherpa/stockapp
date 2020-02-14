import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPortfolio, getLatestValues } from "../store";
import SingleSymbol from "./singleSymbol";
import BuySellBox from "./buysellbox";

const HomePortfolio = props => {
  const date = new Date();
  useEffect(() => {
    fetchData();
    let symbols = props.stocks
      .map(stock => {
        return stock.symbol;
      })
      .join(",");
    let interval = setInterval(() => {
      props.getLatestValues(symbols, interval);
    }, 60000);
    checkMarket(interval);

    async function fetchData() {
      await props.getPortfolio();
    }
    function checkMarket(interval) {
      let day = date.getDay(); // [sun,moon,tues,wed,thurs,fri,sat]
      let hour = date.getHours(); // 0-23
      let minute = date.getMinutes(); // 0-59
      if (
        (hour === 9 && minute < 30) ||
        hour < 9 ||
        hour >= 16 ||
        day === 0 ||
        day === 6
      ) {
        clearInterval(interval);
      }
    }
  }, [props.portfolioValue]);

  return (
    <div id="home-Conatiner">
      <h2>Portfolio {props.portfolioValue}</h2>
      <div id="symbol-buy-container">
        <div id="portfolio-symbols">
          {props.stocks.length > 0 ? (
            props.stocks.map((stock, index) => {
              return (
                <SingleSymbol
                  key={index}
                  symbol={stock.symbol}
                  shares={stock.totalShares}
                  total={stock.totalValue}
                  status={stock.status}
                />
              );
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
    portfolioValue: state.portfolio.totalValue,
    balance: state.user.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio()),
    getLatestValues: symbols => dispatch(getLatestValues(symbols))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio);
