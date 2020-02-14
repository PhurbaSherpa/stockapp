import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio, getLatestValues } from "../store";
import SingleSymbol from "./singleSymbol";
import BuySellBox from "./buysellbox";

class HomePortfolio extends Component {
  async componentDidMount() {
    await this.props.getPortfolio();
    let symbols = this.props.stocks
      .map(stock => {
        return stock.symbol;
      })
      .join(",");
    setInterval(() => {
      this.props.getLatestValues(symbols);
    }, 30000);
  }
  render() {
    console.log(this.props.portfolioValue);
    return (
      <div id="home-Conatiner">
        <h2>Portfolio {this.props.portfolioValue}</h2>
        <div id="symbol-buy-container">
          <div id="portfolio-symbols">
            {this.props.stocks.length > 0 ? (
              this.props.stocks.map((stock, index) => {
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
    getPortfolio: () => dispatch(getPortfolio()),
    getLatestValues: symbols => dispatch(getLatestValues(symbols))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio);
