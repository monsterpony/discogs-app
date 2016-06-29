'use strict'
const { showArtist } = require('../models/record_model')

// //I don't want all of express just the router
 const recordRouter = require('express').Router();

// router.get('/', function(req, res){
//   // req.session.user

//   res.render('index',{user: req.session.user});
// });

// //gives us access to the route in app.js!!
//

recordRouter.get('/:artist', showArtist, (req, res)=>{
  console.log(res.results)
  res.send(res.results);
})

module.exports = recordRouter
