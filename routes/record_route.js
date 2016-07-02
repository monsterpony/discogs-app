'use strict'

const recordModel = require('../models/record_model')

// //I don't want all of express just the router
 const recordRouter = require('express').Router();



recordRouter.get('/search', recordModel.showArtist, (req, res)=>{
  console.log('done')
   //res.render('search/albums', {albums:res.results});
  res.json('search/albums', res.results)
})


module.exports = recordRouter
