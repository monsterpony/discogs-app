'use strict'

const request = require('request')
const KEY = process.env.DISCOGS_KEY
const SECRET = process.env.DISCOGS_SECRET


module.exports = {


showArtist (req, res, next){

  const musicSearch = req.query.searchType
  const inputValue = req.query.searchValue
  const URL = 'https://api.discogs.com/database/search'


  request.get({
    url: URL,
    qs: {
      'q': inputValue,
      'key': KEY,
      'secret': SECRET
    },
    headers: {
      'User-Agent': 'request'
    },
    json: true
  }, (err, response, data)=>{
    if ( err ) throw err
      let albums = data
    res.results = albums.results
    console.log(res.results)
    console.log(URL)
    next()
  }//end function

  )//end request.get

},//end showArtist


}//module-exports
