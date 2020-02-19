const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/:symbol', async (req, res, next) => {
  const {symbol} = req.params
  try {
    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote&token=${
        process.env.STOCK_API_TOKEN
      }`
    )
    if (data) {
      res.send(data)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/batch/:symbols', async (req, res, next) => {
  const {symbols} = req.params
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${
        process.env.STOCK_API_TOKEN
      }`
    )
    if (data) {
      res.send(data)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    next(err)
  }
})
