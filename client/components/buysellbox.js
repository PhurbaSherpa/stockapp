import React from "react";
import { connect } from "react-redux";
import { addStock } from "../store/portfolio";

const BuySellBox = props => {
  return (
    <form id="buy-sell-form" onSubmit={props.handleSubmit}>
      <div>
        <input placeholder="Ticker Symbol" name="symbol" type="text" />
      </div>
      <div>
        <input placeholder="Quantity" name="quantity" type="number" />
      </div>
      <button id="auth-button" type="submit">
        BUY
      </button>
    </form>
  );
};

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
