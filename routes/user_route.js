const userRouter = require('express').Router();
const { createUser, loginUser } = require('../models/user_model');
//short for const createUser = require('../models/user').createUser

userRouter.get('/new', function(req, res){
  res.render('user/new', {user: req.session.user});
})

userRouter.post('/new', createUser, loginUser, function(req, res){
  console.log(res.user);
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


userRouter.post('/login', loginUser, function(req, res){
  console.log(res.user);
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
    res.redirect('/');
  });
})

// userRouter.get('/logout', function(req, res){
//   //logging out
//   req.session.destroy(function(err){
//     //takes you home
//     res.redirect('user/goodbye');
//   });
// })

module.exports = userRouter;

