const userRouter = require('express').Router();
const { createUser, loginUser, saveToCollection, removeFromCollection } = require('../models/user_model');
//short for const createUser = require('../models/user').createUser

userRouter.get('/new', function(req, res){
  res.render('user/new', {user: req.session.user});
})

userRouter.post('/new', createUser, loginUser, function(req, res){
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err
     //res.redirect('/')
   res.render('user/dashboard', {user: req.session.user})
  })
})

userRouter.get('/login', function(req, res){
  res.render('user/login', {user: req.session.user})
})

userRouter.get('/dashboard', function(req, res){

  res.render('user/dashboard', {user: req.session.user})
})


userRouter.post('/login', loginUser, function(req, res){
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err
     res.render('user/dashboard', {user: req.session.user})
  })
})

//FOR BUTTON
userRouter.delete('/logout', function(req, res){
  //logging out
  req.session.destroy(function(err){
    //takes you home
    res.render('user/goodbye');
  });
})

userRouter.get('/save', saveToCollection, function(req,res){

 res.redirect('/');
// req.session.user = res.user;

//   req.session.reload(function(err){
//     if(err) throw err
//      res.redirect('/')
//   })
})

userRouter.get('/remove', removeFromCollection, function(req,res){

  res.redirect('/');
  // req.session.user = res.user;

  // req.session.reload(function(err){
  //   if(err) throw err
  //    res.redirect('/')
  // })
})


// userRouter.get('/logout', function(req, res){
//   //logging out
//   req.session.destroy(function(err){
//     //takes you home
//     res.redirect('user/goodbye');
//   });
// })

module.exports = userRouter;

