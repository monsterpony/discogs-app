'use strict'
const { showArtist } = require('../models/record_model')

// //I don't want all of express just the router
 const recordRouter = require('express').Router();



recordRouter.get('/:artist', showArtist, (req, res)=>{
  console.log(res.results)
  res.send(res.results);
})

module.exports = recordRouter
