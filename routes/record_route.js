'use strict'

 const recordRouter = require('express').Router();


recordRouter.get('/', (req, res)=>{
  res.render('record/dig', {user: req.session.user})
})

// recordRouter.get('/', (req, res)=>{
//    //res.render('music/albums', {albums:res.results, user: req.session.user});
//  //res.send('hello')
//  res.render('music/albums', {user: req.session.user})
// })


module.exports = recordRouter
