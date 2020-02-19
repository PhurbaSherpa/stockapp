const router = require('express').Router()
const User = require('../db/models/user')
const {checkUser} = require('../utils')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(errx)
  }
})

router.post('/signup', async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    console.log('the error', err)
    res.status(401).send(err.errors[0].message)
  }
})

router.post('/logout', async (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', checkUser, (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
