const checkUser = (req, res, next) => {
  if (req.user) {
    next();
  } else res.sendStatus(401);
};

module.exports = checkUser;
