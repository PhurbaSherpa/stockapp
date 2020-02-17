const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  action: {
    type: Sequelize.ENUM(["BUY", "SELL"]),
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    min: 0
  },
  shares: {
    type: Sequelize.INTEGER,
    min: 1
  }
});

module.exports = Transaction;
