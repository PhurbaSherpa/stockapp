import React from "react";

export default function SingleTransaction(props) {
  const { action, symbol, price, shares } = props.transaction;
  return (
    <div id="singleTransaction">
      <div style={{ fontWeight: 600 }}>{action}</div>
      <div>{symbol}</div>
      <div>{shares} shares</div>
      <div>@ {price}</div>
    </div>
  );
}
