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
