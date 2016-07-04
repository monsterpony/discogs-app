'use strict'

const recordModel = require('../models/record_model')
const apiRouter = require('express').Router();



apiRouter.get('/record', recordModel.showArtist, (req, res) => {

  //res.render('music/albums', {albums:res.results});
  res.json(res.results)
})

apiRouter.get('/dig', recordModel.showArtist, (req, res) => {
  res.render('record/results', {
    albums: res.results,
    user: req.session.user
  })
})


module.exports = apiRouter
