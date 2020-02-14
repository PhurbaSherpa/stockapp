import React from "react";

export default function SingleSymbol(props) {
  let color = "grey";
  if (props.status === "POSITIVE") {
    color = "green";
  }
  if (props.status === "NEGATIVE") {
    color = "red";
  }
  return (
    <div className="singleSymbol">
      <div>{props.symbol}</div>
      <div>{props.shares}</div>
      <div style={{ color: color }}>{props.total}</div>
    </div>
  );
}
