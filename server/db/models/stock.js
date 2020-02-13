const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalShares: {
    type: Sequelize.INTEGER,
    min: 1
  }
});

module.exports = Stock;
