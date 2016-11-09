// load environment variables defined in .env
require('dotenv').load()

const debug = require('debug')('bouquet:index')

// set up database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

// set up the server
const express = require('express')
const app = express()

const logger = require('morgan')
app.use(logger(app.get('environment') === 'production' ? 'combined' : 'dev'))

// parse request bodies (json- and url-encoded) and add session support
const bodyParser = require('body-parser')
const session = require('express-session')
const SessionStore = require('connect-mongo')(session)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true // parse with `qs`, thus enabling stuff like arrays
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // save session when it's not initialized
  resave: false,            // save the session back even when it's unmodified (check if store implements `touch`)
  store: new SessionStore({
    url: process.env.MONGODB_URI
  })
}))

// expose current account as `req.user` if a session is established
const user = require('./middleware/user')
app.use(user())

// our index
app.get('/', (req, res) => res.render('index'))

// authentication and authorization via portier
const auth = require('./middleware/auth')
app.use('/auth', auth)

// add our template engine, use `.hbs` for extensions and find partials in `public/partials`
const hbs = require('express-hbs')
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/public/__layout.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/public')

// serve our js and css resources
const serveStatic = require('serve-static')
app.use('/dist', serveStatic(__dirname + '/public/dist'))

module.exports = app

if (!module.parent) {
  const port = process.env.SERVER_PORT
  app.listen(port, _ => console.log(`Server started on port ${port}`))
}
