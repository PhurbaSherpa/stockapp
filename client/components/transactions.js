import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllTransactions } from "../store";

const Transactions = props => {
  useEffect(() => {
    props.getAllTransactions();
  }, [props.transactions.length]);

  console.log(props.transactions);
  return <div></div>;
};

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
  getAllTransactions: () => dispatch(getAllTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
