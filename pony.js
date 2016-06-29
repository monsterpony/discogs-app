const request = require('request')

let options = {
  url: 'https://api.discogs.com/database/search?q=Nirvana&key=iMVrcwxrFLXPkdYQmOGv&secret=TUkEkKwOQuElkfourOJmzVIHoBFnYHAj',
  headers: {
    'User-Agent': 'request'
  }
}

request(options, function(error, response, data){
  let results = JSON.parse(data)
  console.log(results.results[0])
})
// results = JSON.parse(results)
// console.log(results)
