const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalValue: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
    min: 0
  },
  totalShares: {
    type: Sequelize.INTEGER,
    min: 1
  },
  status: {
    type: Sequelize.ENUM(["POSITIVE", "NEGATIVE", "EQUAL"])
  }
});

module.exports = Stock;
