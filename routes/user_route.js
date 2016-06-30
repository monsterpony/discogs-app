const router = require('express').Router();
const { createUser, loginUser } = require('../models/user_model');
//short for const createUser = require('../models/user').createUser

router.get('/new', function(req, res){
  res.render('user/new');
})

router.post('/new', createUser, loginUser, function(req, res){
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err
     res.redirect('/')
  })
})

router.get('/login', function(req, res){
  res.render('user/login')
})


router.post('/login', loginUser, function(req, res){
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err
     res.redirect('/')
  })
})

//FOR BUTTON
// router.delete('/logout', function(req, res){
//   //logging out
//   req.session.destroy(function(err){
//     //takes you home
//     res.redirect('/');
//   });
// })

router.get('/logout', function(req, res){
  //logging out
  req.session.destroy(function(err){
    //takes you home
    res.redirect('/');
  });
})

module.exports = router;
