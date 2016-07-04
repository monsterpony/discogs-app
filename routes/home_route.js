//I don't want all of express just the router
const homeRouter = require('express').Router();

homeRouter.get('/', function(req, res) {
  // req.session.user

  res.render('index', {
    user: req.session.user
  });
});

//gives us access to the route in app.js!!
module.exports = homeRouter
