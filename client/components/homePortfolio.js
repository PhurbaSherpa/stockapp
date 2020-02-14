import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";
import SingleSymbol from "./singleSymbol";
import BuySellBox from "./buysellbox";

class HomePortfolio extends Component {
  componentDidMount() {
    this.props.getPortfolio();
  }
  render() {
    console.log(this.props.portfolioValue);
    return (
      <div id="home-Conatiner">
        <h2>Portfolio {this.props.portfolioValue}</h2>
        <div id="symbol-buy-container">
          <div id="portfolio-symbols">
            {this.props.stocks.map((stock, index) => {
              return (
                <SingleSymbol
                  key={index}
                  symbol={stock.symbol}
                  shares={stock.totalShares}
                  total={stock.totalValue}
                />
              );
            })}
          </div>
          <div id="vertical-line"></div>
          <div id="buy-sell-container">
            <h2>Cash ${this.props.balance}</h2>
            <BuySellBox />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.portfolio.stocks,
    portfolioValue: state.portfolio.totalValue,
    balance: state.user.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio);
