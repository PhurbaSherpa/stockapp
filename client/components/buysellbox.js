import React from "react";
import { connect } from "react-redux";
import { addStock } from "../store/portfolio";

const BuySellBox = props => {
  return (
    <div id="buy-sell-container">
      <div id="stock-info">
        <div id="stock-latestPrice">Latest Price: $1000</div>
        <div id="stock-openPrice">Today's Open Price: $2000</div>
      </div>
      <form id="buy-sell-form" onSubmit={props.handleSubmit}>
        <input
          className="buy-sell-box"
          placeholder="Ticker Symbol"
          name="symbol"
          type="text"
        />
        <input
          className="buy-sell-box"
          placeholder="Quantity"
          name="quantity"
          type="number"
        />
        <button onClick={() => {}} className="buy-sell-box">
          Search
        </button>
        <button className="buy-sell-box" type="submit">
          BUY
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      const symbol = evt.target.symbol.value;
      const quantity = evt.target.quantity.value;
      dispatch(addStock(symbol, quantity));
    }
  };
};

export default connect(null, mapDispatchToProps)(BuySellBox);
