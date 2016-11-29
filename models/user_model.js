const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
//callback - as soon as createSecure creates secure passwork, fire the callback function (saveUser)

function createSecure(email, password, callback) {
        bcrypt.genSalt(function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                        callback(email, hash);
                    }) //end bcrypt hash
            }) //end bcrypt genSalt
    } //end createSecure

function createUser(req, res, next) {
    //first run check to validate user
    //if null then create secure...
    //else...console.log err user exists

        createSecure(req.body.email, req.body.password, saveUser);

        function saveUser(email, hash) {
                //fires off whatever is in our req.body

                MongoClient.connect(dbConnection, function(err, db) {
                        let userInfo = {
                                fname: req.body.fname,
                                lname: req.body.lname,
                                email: email,
                                passwordDigest: hash,
                                favorites: []
                            } //userInfo
                        db.collection('user').insertOne(userInfo, function(err, result) {
                                if (err) throw err;
                                next();
                            }) //end collection
                    }) //end mongoClient
            } //end saveUser
    } //end createUser
    //LOGIN

function loginUser(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        MongoClient.connect(dbConnection, function(err, db) {
                //mongo query from users db inside auth_practice
                db.collection('user').findOne({
                        "email": email
                    }, function(err, user) {
                        if (err) throw err;
                        if (user === null) {
                            console.log('cannot find user with email', email);
                        } else if (bcrypt.compareSync(password, user.passwordDigest)) {
                            res.user = user;
                            next();
                        } else if (!bcrypt.compareSync(password, user.passwordDigest)) {
                            console.log('womp womp not a password')
                        } //end if
                    }) //end dbcollection
            }) //end mongoClient connect
    } //end loginUser

function saveToCollection(req, res, next) {
        //entire favorites array
        let email = req.session.user.email
        let title = req.query.title;
        let url = req.query.url;
        MongoClient.connect(dbConnection, function(err, db) {
                db.collection('user').update({
                        email: email
                    }, {
                        $addToSet: {
                            favorites: {
                                title: title,
                                url: url
                            }
                        }
                    }, function(err, user) {
                        if (err) throw err
                        res.user = user
                        next()
                    }) //end dbcollection
            }) //end mongoClient
    } //end save favorite

function removeFromCollection(req, res, next) {
        //entire favorites array
        let email = req.session.user.email
        let title = req.query.title;
        let url = req.query.url;
        MongoClient.connect(dbConnection, function(err, db) {
                db.collection('user').update({
                        email: email
                    }, {
                        $pull: {
                            favorites: {
                                title: title,
                                url: url
                            }
                        }
                    }, function(err, user) {
                        if (err) throw err
                        res.user = user;
                        next()
                    }) //end dbcollection
            }) //end mongoClient
    } //end save favorite

function getCollection(req, res, next) {
        if (req.session && req.session.user) {
            MongoClient.connect(dbConnection, function(err, db) {
                if (err) throw err;
                db.collection('user').findOne({
                    email: req.session.user.email
                }, function(err, user) {
                    if (user) {
                        req.user = user;
                        delete req.user.password; // delete the password from the session
                        req.session.user = user; //refresh the session value
                        res.locals.user = user;
                        // finishing processing the middleware and run the route
                        next();
                    } else {
                        next();
                    } //end if/else
                }) //end if
            }) //end if
        } //endif
    }//end getCollection

module.exports = {
    createUser, loginUser, getCollection, saveToCollection, removeFromCollection
}
