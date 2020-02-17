const router = require("express").Router();
const { Transaction, Stock } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    let transactions = await Transaction.findAll({
      where: {
        userId: req.user.id
      }
    });

    if (!transactions) res.sendStatus(400);
    else res.json(transactions);
  } catch (error) {
    next(errro);
  }
});

router.post("/sell", async (req, res, next) => {
  let { stock, quantity } = req.body;
  let price = (+stock.totalValue / +stock.totalShares).toFixed(2);
  try {
    if (stock.totalShares < quantity) {
      res.sendStatus(400);
    } else {
      let newTransaction = await Transaction.create({
        action: "SELL",
        symbol: stock.symbol,
        price: +price,
        shares: quantity,
        userId: req.user.id
      });
      if (!newTransaction) res.sendStatus(400);
      else res.json(newTransaction);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/buy", async (req, res, next) => {
  let { stock, quantity } = req.body;
  let price = stock.latestPrice.toFixed(2);
  try {
    if (req.user.balance < price * quantity) {
      res.sendStatus(400);
    } else {
      let newTransaction = await Transaction.create({
        action: "BUY",
        symbol: stock.symbol,
        price: +price,
        shares: quantity,
        userId: req.user.id
      });
      if (!newTransaction) res.sendStatus(400);
      else res.json(newTransaction);
    }
  } catch (error) {
    next(error);
  }
});
