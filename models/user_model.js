const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/auth_practice';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

//callback - as soon as createSecure creates secure passwork, fire the callback function (saveUser)
function createSecure(email, password, callback){
  bcrypt.genSalt(function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      callback(email, hash);
    })//end bcrypt hash
  })//end bcrypt genSalt
}//end createSecure

function createUser(req, res, next){
  createSecure( req.body.email, req.body.password, saveUser)
    function saveUser(email, hash){
      console.log('email', email);
      console.log('passwordDigest', hash)
      //fires off whatever is in our req.body
      MongoClient.connect(dbConnection, function(err,db){
        let userInfo = {
          fname: req.body.fname,
          lname: req.body.lname,
          email: email,
          passwordDigest: hash
        }//userInfo
        db.collection('users').insertOne(userInfo, function (err, result){
            if (err) throw err;
            next();
        })//end collection
      })//end mongoClient
    }//end saveUser
}//end createUser

//LOGIN

function loginUser(req, res, next){
  let email = req.body.email
  let password = req.body.password

  MongoClient.connect(dbConnection, function(err, db){
    //mongo query from users db inside auth_practice
    db.collection('users').findOne({"email": email}, function(err, user){
      if( err ) throw err;
      if( user === null){
        console.log('cannot find user with email', email);
      } else if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }//end if
      next();
    })//end dbcollection
  })//end mongoClient connect
}//end loginUser



//shorthand for loginUser: loginUser
module.exports = { createUser, loginUser }
