const router = require("express").Router();
module.exports = router;

router.use("/portfolio", require("./portfolio"));
router.use("/balance", require("./balance"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
