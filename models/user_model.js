const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/users';
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
  if(req.body.email && req.body.password && req.body.fname && req.body.lame){
     createSecure( req.body.email, req.body.password, saveUser)
    function saveUser(email, hash){
      //fires off whatever is in our req.body
      MongoClient.connect(dbConnection, function(err,db){
        let userInfo = {
          fname: req.body.fname,
          lname: req.body.lname,
          email: email,
          passwordDigest: hash,
        }//userInfo
        db.collection('user').insertOne(userInfo, function (err, result){
            if (err) throw err;
            next();
        })//end collection
      })//end mongoClient
    }//end saveUser
  } else {
    console.log('fill out form')
  }//end elses

}//end createUser

//LOGIN

function loginUser(req, res, next){
  let email = req.body.email
  let password = req.body.password

  MongoClient.connect(dbConnection, function(err, db){
    //mongo query from users db inside auth_practice
    db.collection('user').findOne({"email": email}, function(err, user){
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

// function addFavorite (req,res,next){
//   //entire favorites array
//   let email = req.body.email
//   let favorites = req.body.favorites
//   MongoCliennt.connect(dbConnection, function(err,db){

//     db.collection('user').findOne({"email": email}, function (err, user){
//       if (err) throw err
//       console.log(user, 'USER')
//     })//end dbcollection
//   })//end mongoClient

//   //resp what to do add
// }



//shorthand for loginUser: loginUser
module.exports = { createUser, loginUser }
