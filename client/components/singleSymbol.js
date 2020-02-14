import React, { Component } from "react";
import { connect } from "react-redux";

class SingleSymbol extends Component {
  render() {
    let color = "grey";
    if (this.props.status === "POSITIVE") {
      color = "green";
    }
    if (this.props.status === "NEGATIVE") {
      color = "red";
    }
    return (
      <div className="singleSymbol">
        <div>{this.props.symbol}</div>
        <div>{this.props.shares}</div>
        <div style={{ color: color }}>{this.props.total}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSymbol);
