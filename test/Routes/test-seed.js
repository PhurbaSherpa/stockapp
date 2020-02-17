const { User, Transaction, Stock } = require("../../server/db/models");
const db = require("../../server/db");

module.exports = async () => {
  await db.sync({ force: true });

  const [cody] = await Promise.all([
    User.create({
      email: "cody@email.com",
      password: "abc123ABC!*",
      firstName: "Cody",
      lastName: "Sun",
      balance: 13000
    })
  ]);

  const [codyAAPLbuyTransaction, codyAPPLsellTransaction] = await Promise.all([
    Transaction.create({
      userId: 1,
      action: "BUY",
      symbol: "AAPL",
      price: 325.19,
      shares: 4
    }),
    Transaction.create({
      userId: 1,
      action: "SELL",
      symbol: "AAPL",
      price: 335.19,
      shares: 2
    })
  ]);

  const [AAPL, TSLA] = await Promise.all([
    Stock.create({
      userId: 1,
      symbol: "AAPL",
      totalShares: 2,
      totalValue: 650.38,
      status: "POSITIVE"
    }),
    Stock.create({
      userId: 1,
      symbol: "TSLA",
      totalShares: 4,
      totalValue: 3192,
      status: "NEGATIVE"
    })
  ]);

  return [cody, codyAAPLbuyTransaction, codyAPPLsellTransaction, AAPL, TSLA];
};
