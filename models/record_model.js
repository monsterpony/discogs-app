'use strict'

const request = require('request')
const KEY = process.env.DISCOGS_KEY
const SECRET = process.env.DISCOGS_SECRET


module.exports = {


showArtist (req, res, next){

  const musicSearch = req.query.type
  const inputValue = req.query.value//new RegExp( '^' + req.query.value, 'i')
  const URL = 'https://api.discogs.com/database/search';

  let qs =  {
      'key': KEY,
      'secret': SECRET
    }

   if (musicSearch === 'artist') {
    qs.artist = inputValue;
   } else {
    qs.title = inputValue;
   }

  request.get({
    url: URL,
    qs: qs,
    headers: {
      'User-Agent': 'request'
    },
    json: true
  }, (err, response, data)=>{
    if ( err ) throw err
      let albums = data
      res.results = albums.results
    //console.log(res.results)
    //console.log(URL)
    next()
  }//end function

  )//end request.get

},//end showArtist


}//module-exports
