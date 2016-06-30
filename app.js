const express     = require('express')
const app         = express()
const PORT        = process.env.PORT || 3000
const logger      = require('morgan')
const path        = require('path')
const bodyParser  = require('body-parser')
const session     = require('express-session')
const methodOverride = require('method-override')

const recordRoute = require('./routes/record_route')
const userRoute   = require('./routes/user_route')


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))
app.use(methodOverride('_method'))
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'ponies',
  cookies: {maxAge: 60000}
}))



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//ROUTES

app.use('/search', recordRoute)
app.use('/user', userRoute)


app.get('/', function(req, res){
  res.render('index')
})






//PORT
app.listen(PORT, function(){
 console.log('server magic ', PORT)
})
