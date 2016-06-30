'use strict'

const request = require('request')
const KEY = process.env.DISCOGS_KEY
const SECRET = process.env.DISCOGS_SECRET



module.exports = {


showArtist (req, res, next){

  request.get({
    url: 'https://api.discogs.com/database/search',
    qs: {
      'q': req.params.artist,
      'key': KEY,
      'secret': SECRET
    },
    headers: {
      'User-Agent': 'request'
    }
  }, (err, response, data)=>{
    if ( err ) throw err
      let albums = JSON.parse(data)
    res.results = albums.results
    next()
  }//end function

  )//end request.get

},//end showArtist

showTitle (req, res, next){


  request.get({
    url: 'https://api.discogs.com/database/search',
    qs: {
      'q': req.params.title,
      'key': KEY,
      'secret': SECRET
    },
    headers: {
      'User-Agent': 'request'
    }
  }, (err, response, data)=>{
    if ( err ) throw err
      let titles = JSON.parse(data)
    res.results = titles.results
    next()
  }//end function

  )//end request.get

}//end showTitle




}//module-exports
