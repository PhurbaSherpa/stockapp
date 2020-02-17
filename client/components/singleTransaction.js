import React from "react";

export default function SingleTransaction(props) {
  const { action, symbol, price, shares, createdAt } = props.transaction;

  let date = createdAt.slice(0, 10);
  let time = createdAt.slice(11, createdAt.length - 2);

  return (
    <div id="singleTransaction">
      <div>{date}</div>
      <div>{time}</div>
      <div style={{ fontWeight: 600 }}>{action}</div>
      <div>{symbol}</div>
      <div>{shares} shares</div>
      <div>@ {price}</div>
    </div>
  );
}
