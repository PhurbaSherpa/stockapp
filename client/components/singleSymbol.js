import React, { useState } from "react";
import { connect } from "react-redux";

const SingleSymbol = props => {
  const { increaseBalance, addSellTransaction, stock } = props;
  const { symbol, totalShares, totalValue, status } = stock;
  const price = totalValue / totalShares;
  const [sharesToSell, setSharesToSell] = useState(0);
  let color = "grey";
  if (status === "POSITIVE") {
    color = "green";
  }
  if (status === "NEGATIVE") {
    color = "red";
  }
  return (
    <div className="singleSymbol">
      <div>{symbol}</div>
      <div>{totalShares}</div>
      <div style={{ color: color }}>{totalValue}</div>
      <div>
        <button
          disabled={sharesToSell > totalShares || sharesToSell < 0}
          id="sellButton"
          type="button"
          onClick={() => {
            if (sharesToSell === totalShares) {
              deleteStock(stock, sharesToSell);
            } else {
              removeShares(stock, sharesToSell);
            }
            increaseBalance(price, sharesToSell);
            addSellTransaction(stock, sharesToSell);
          }}
        >
          SELL
        </button>
        <input
          type="number"
          max={`${totalShares}`}
          min="0"
          onChange={event => {
            setSharesToSell(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  increaseBalance: (price, quantity) =>
    dispatch(increaseBalance(price, quantity)),
  addSellTransaction: (stock, quantity) =>
    dispatch(addSellTransaction(stock, quantity))
});

export default connect(null, mapDispatchToProps)(SingleSymbol);
