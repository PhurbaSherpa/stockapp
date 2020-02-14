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
  }
});

Stock.portfolioValue = async function(id) {
  let value = 0;
  let myStocks = await Stock.findAll({
    where: {
      userId: id
    }
  });
  if (myStocks.length > 0) {
    myStocks.forEach(stock => {
      value += +stock.dataValues.totalValue;
    });
  }
  return value;
};

module.exports = Stock;
