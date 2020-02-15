import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllTransactions } from "../store";
import SingleTransaction from "./singleTransaction";

const Transactions = props => {
  useEffect(() => {
    props.getAllTransactions();
  }, [props.transactions.length]);

  return (
    <div id="transactions-container">
      <h2>Transactions</h2>
      <div>
        {props.transactions.map((transaction, index) => {
          return <SingleTransaction key={index} transaction={transaction} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
  getAllTransactions: () => dispatch(getAllTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
