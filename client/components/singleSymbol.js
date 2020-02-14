import React from "react";

export default function singleSymbol(props) {
  return (
    <div className="singleSymbol">
      <div>{props.symbol}</div>
      <div>{props.shares}</div>
      <div>{props.total}</div>
    </div>
  );
}
