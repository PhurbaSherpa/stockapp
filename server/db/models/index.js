const User = require("./user");
const Transaction = require("./transaction");
const Stock = require("./stock");

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Stock);
Stock.belongsTo(User);

module.exports = {
  User,
  Transaction,
  Stock
};
