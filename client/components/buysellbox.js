import React, { useState } from "react";
import { connect } from "react-redux";
import { addStock, getStockInfo } from "../store";

const BuySellBox = props => {
  const [tickerSymbol, setTickerSymbol] = useState("");

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
          onChange={event => {
            setTickerSymbol(event.target.value);
          }}
        />
        <input
          className="buy-sell-box"
          placeholder="Quantity"
          name="quantity"
          type="number"
        />
        <button
          type="button"
          onClick={() => {
            props.getStockInfo(tickerSymbol);
          }}
          className="buy-sell-box"
        >
          Search
        </button>
        <button className="buy-sell-box" type="submit">
          BUY
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  marketStatus: state.marketStatus
});

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      const symbol = evt.target.symbol.value;
      const quantity = evt.target.quantity.value;
      dispatch(addStock(symbol, quantity));
    },
    getStockInfo: symbol => dispatch(getStockInfo(symbol))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySellBox);
