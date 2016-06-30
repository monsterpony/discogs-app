'use strict'

const recordModel = require('../models/record_model')

// //I don't want all of express just the router
 const recordRouter = require('express').Router();



recordRouter.get('/artist/:artist', recordModel.showArtist, (req, res)=>{

  console.log(res.results)
  res.render('search/albums', {albums:res.results});
})

recordRouter.get('/title/:title', recordModel.showTitle, (req, res)=>{
  //console.log(res.results)
  res.send('title page');
})

module.exports = recordRouter
