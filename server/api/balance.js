const router = require('express').Router()
module.exports = router

router.put('/decrease', async (req, res, next) => {
  try {
    const {price, quantity} = req.body
    req.user.balance = +req.user.balance - +(price * quantity).toFixed(2)
    await req.user.save()
    res.json(req.user)
  } catch (error) {
    next(error)
  }
})

router.put('/increase', async (req, res, next) => {
  try {
    const {price, quantity} = req.body
    req.user.balance = +req.user.balance + +(price * quantity).toFixed(2)
    await req.user.save()
    res.json(req.user)
  } catch (error) {
    next(error)
  }
})
