'use strict'
const { showArtist, showTitle } = require('../models/record_model')

// //I don't want all of express just the router
 const recordRouter = require('express').Router();



recordRouter.get('/:artist', showArtist, (req, res)=>{
  //console.log(res.results)
  res.send(res.results[0].title);
})

recordRouter.get('/:title', showTitle, (req, res)=>{
  //console.log(res.results)
  res.send('title page');
})

module.exports = recordRouter
