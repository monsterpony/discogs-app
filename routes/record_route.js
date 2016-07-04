'use strict'

const recordRouter = require('express').Router();


recordRouter.get('/', (req, res) => {
  res.render('record/dig', {
    user: req.session.user
  })
})


module.exports = recordRouter
