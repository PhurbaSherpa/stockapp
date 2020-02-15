import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addStock,
  getStockInfo,
  addShares,
  decreaseBalance,
  addBuyTransaction
} from "../store";

const BuySellBox = props => {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [quantity, setQuantity] = useState(1);
  const {
    marketStatus,
    getStockInfo,
    stock,
    searchError,
    addStock,
    ownedSymbols,
    addShares,
    decreaseBalance,
    balance,
    addBuyTransaction
  } = props;

  return (
    <div id="buy-sell-container">
      <div id="stock-info">
        <div id="marketStatus">Market Status: {marketStatus.toUpperCase()}</div>
        <div>Symbol: {stock.symbol}</div>
        <div id="stock-latestPrice">Latest Price: ${stock.latestPrice}</div>
        <div id="stock-openPrice">Today's Open Price: ${stock.openPrice}</div>
      </div>
      <form id="buy-sell-form">
        <input
          className="buy-sell-box"
          placeholder="Ticker Symbol"
          name="symbol"
          type="text"
          onChange={event => {
            getStockInfo(event.target.value);
            setTickerSymbol(event.target.value);
          }}
        />
        <input
          className="buy-sell-box"
          placeholder="Quantity"
          name="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={event => {
            setQuantity(event.target.value);
          }}
        />
        {searchError ? <div>{searchError}</div> : null}
        {quantity <= 0 ? <div>Quantity must be greater than 0</div> : null}
        <button
          className="buy-sell-box"
          type="button"
          disabled={
            tickerSymbol === "" ||
            !!searchError ||
            quantity <= 0 ||
            balance < stock.latestPrice * quantity
          }
          onClick={() => {
            if (quantity > 0) {
              if (ownedSymbols.includes(stock.symbol)) {
                addShares(stock, quantity);
              } else {
                addStock(stock, quantity);
              }
              decreaseBalance(stock.latestPrice, quantity);
              addBuyTransaction(stock, quantity);
            }
          }}
        >
          BUY
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  marketStatus: state.marketStatus,
  stock: state.stockToBuy,
  searchError: state.stockToBuy.error,
  ownedSymbols: state.portfolio.stocks.map(stock => stock.symbol),
  balance: state.user.balance
});

const mapDispatchToProps = dispatch => {
  return {
    addStock: (stock, quantity) => dispatch(addStock(stock, quantity)),
    addShares: (stock, quantity) => dispatch(addShares(stock, quantity)),
    getStockInfo: symbol => dispatch(getStockInfo(symbol)),
    decreaseBalance: (price, quantity) =>
      dispatch(decreaseBalance(price, quantity)),
    addBuyTransaction: (stock, quantity) =>
      dispatch(addBuyTransaction(stock, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySellBox);
