const db = require("../server/db");
const { User, Transaction, Stock } = require("../server/db/models");
module.exports = seed;

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      email: "cody@email.com",
      password: "123",
      firstName: "Cody",
      lastName: "Sun",
      balance: 13000
    }),
    User.create({
      email: "murphy@email.com",
      password: "123",
      firstName: "Murphy",
      lastName: "Moon",
      balance: 9000
    })
  ]);

  const transactions = await Promise.all([
    Transaction.create({
      userId: 1,
      action: "BUY",
      symbol: "AAPL",
      price: 325.19,
      shares: 4
    }),
    Transaction.create({
      userId: 1,
      action: "BUY",
      symbol: "MSFT",
      price: 184.02,
      shares: 10
    }),
    Transaction.create({
      userId: 1,
      action: "BUY",
      symbol: "TSLA",
      price: 184.02,
      shares: 10
    }),
    Transaction.create({
      userId: 1,
      action: "SELL",
      symbol: "AAPL",
      price: 335.19,
      shares: 2
    }),
    Transaction.create({
      userId: 1,
      action: "SELL",
      symbol: "MSFT",
      price: 194.02,
      shares: 5
    }),
    Transaction.create({
      userId: 1,
      action: "SELL",
      symbol: "TSLA",
      price: 184.02,
      shares: 6
    })
  ]);

  const stocks = await Promise.all([
    Stock.create({
      userId: 1,
      symbol: "AAPL",
      totalShares: 2,
      totalValue: 650.38,
      status: "POSITIVE"
    }),
    Stock.create({
      userId: 1,
      symbol: "MSFT",
      totalShares: 5,
      totalValue: 920.1,
      status: "NEGATIVE"
    }),
    Stock.create({
      userId: 1,
      symbol: "TSLA",
      totalShares: 4,
      totalValue: 3192,
      status: "NEGATIVE"
    })
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${transactions.length} transactions`);
  console.log(`seeded ${stocks.length} stocks`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
