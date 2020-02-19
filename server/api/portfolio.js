const router = require('express').Router()
const {Stock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      where: {userId: req.user.id}
    })
    if (stocks) {
      res.json(stocks)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  let {stock, quantity} = req.body
  try {
    let isStockOwned = await Stock.findOne({
      where: {symbol: stock.symbol, userId: req.user.id}
    })
    if (isStockOwned) {
      res.sendStatus(400)
    } else {
      let total = +stock.latestPrice * +quantity
      let status
      if (stock.latestPrice > stock.openPrice) {
        status = 'POSITIVE'
      } else if (stock.latestPrice < stock.openPrice) {
        status = 'NEGATIVE'
      } else status = 'EQUAL'

      let newStock = await Stock.create({
        symbol: stock.symbol,
        totalValue: total,
        totalShares: +quantity,
        userId: req.user.id,
        status: status
      })

      if (!newStock) res.sendStatus(400)
      else {
        res.json(newStock)
      }
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:symbol', async (req, res, next) => {
  try {
    let {symbol} = req.params
    let toBeDestroyed = await Stock.findOne({
      where: {
        userId: req.user.id,
        symbol: symbol
      }
    })
    if (!toBeDestroyed) {
      res.sendStatus(400)
    } else {
      await toBeDestroyed.destroy()
      res.json(toBeDestroyed)
    }
  } catch (error) {}
})

router.put('/quantity', async (req, res, next) => {
  let {stock, quantity} = req.body
  try {
    let existingStock = await Stock.findOne({
      where: {
        userId: req.user.id,
        symbol: stock.symbol
      }
    })
    if (existingStock) {
      if (!stock.latestPrice) {
        stock.latestPrice = +stock.totalValue / +stock.totalShares
      }
      existingStock.totalShares += +quantity
      let newTotal = existingStock.totalShares * +stock.latestPrice
      existingStock.totalValue = +newTotal.toFixed(2)
      await existingStock.save()
      res.json(existingStock)
    } else res.sendStatus(400)
  } catch (error) {
    next(error)
  }
})

router.put('/currentvalues', async (req, res, next) => {
  let values = req.body.data
  try {
    const stocks = await Stock.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (stocks) {
      stocks.forEach(async stock => {
        let latestPrice = values[stock.symbol].quote.latestPrice
        if (!latestPrice) {
          latestPrice = values[stock.symbol].quote.previousClose
        }
        const openPrice = values[stock.symbol].quote.open
        if (latestPrice > openPrice) {
          stock.status = 'POSITIVE'
        } else if (latestPrice < openPrice) {
          stock.status = 'NEGATIVE'
        } else {
          stock.status = 'EQUAL'
        }
        stock.totalValue = (latestPrice * stock.totalShares).toFixed(2)
        await stock.save()
      })
      res.json(stocks)
    }
  } catch (error) {
    next(error)
  }
})
