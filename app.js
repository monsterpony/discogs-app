const express     = require('express')
const app         = express()
const PORT        = process.env.PORT || 3000
const logger      = require('morgan')
const path        = require('path')
const recordRoute = require('./routes/record_route')


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))
app.use('/searchArtist', recordRoute)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//ROUTES

//home (get '/' and render home)

// app.get('/', function(req, res){
//   res.render('index')
// })




//PORT
app.listen(PORT, function(){
 console.log('server magic ', PORT)
})
