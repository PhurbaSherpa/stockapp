import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";

class HomePortfolio extends Component {
  componentDidMount() {
    this.props.getPortfolio();
  }

  render() {
    return (
      <div>
        <h2>Portfolio {this.props.portfolioValue}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.portfolio.stocks,
    portfolioValue: state.portfolio.totalValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePortfolio);
