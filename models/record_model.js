'use strict'

const request = require('request')



function showArtist (req, res, next){

  let options = {
  url: 'https://api.discogs.com/database/search?q='+req.params.artist+'&key=iMVrcwxrFLXPkdYQmOGv&secret=TUkEkKwOQuElkfourOJmzVIHoBFnYHAj',
  headers: {
    'User-Agent': 'request'
  }//header object
}//options object

  request(options, function(error, response, data){
    if (error) throw error
    let albums = JSON.parse(data)
  //console.log(results.results[0])
    res.results = albums.results;//last results is object key
    next()

  })//end request

}//end showArtist

// results = JSON.parse(results)
// console.log(results)

module.exports = { showArtist }
