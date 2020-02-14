const router = require("express").Router();
const { Stock } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      where: { userId: req.user.id }
    });
    if (stocks) {
      let value = await Stock.portfolioValue(req.user.id);
      res.json({ stocks, value });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  let values = req.body.data;
  try {
    const stocks = await Stock.findAll({
      where: {
        userId: req.user.id
      }
    });
    if (stocks) {
      stocks.forEach(async stock => {
        const latestPrice = values[stock.symbol].quote.latestPrice;
        const openPrice = values[stock.symbol].quote.open;
        if (latestPrice > openPrice) {
          stock.status = "POSITIVE";
        } else if (latestPrice < openPrice) {
          stock.status = "NEGATIVE";
        } else {
          stock.status = "EQUAL";
        }
        stock.totalValue = (latestPrice * stock.totalShares).toFixed(2);
        await stock.save();
      });
      let value = await Stock.portfolioValue(req.user.id);
      res.json({ stocks, value });
    }
  } catch (error) {}
});
