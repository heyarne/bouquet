// load environment variables defined in .env
require('dotenv').load()
const { MONGODB_URI, SESSION_SECRET, SERVER_PORT } = process.env

const debug = require('debug')('bouquet:server')

// set up database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, _ => console.log(`Mongoose connected to ${MONGODB_URI}`))

// set up the server
const express = require('express')
const app = express()

const logger = require('morgan')
app.use(logger(app.get('environment') === 'production' ? 'combined' : 'dev'))

// parse request bodies (json- and url-encoded) and add session support
const bodyParser = require('body-parser')
const session = require('express-session')
const SessionStore = require('connect-mongo')(session)

app.use(bodyParser.json({ limit: '512kb' }))
app.use(bodyParser.urlencoded({
  limit: '512kb',
  extended: true // parse with `qs`, thus enabling stuff like arrays
}))
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false, // save session when it's not initialized
  resave: false,            // save the session back even when it's unmodified (check if store implements `touch`)
  store: new SessionStore({
    url: MONGODB_URI
  })
}))

// set up session enhancers
const { exposeCurrentUser } = require('./middleware/session-utils')
app.use(exposeCurrentUser())

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

// set up the few routes where we actually render html on the server side
app.get('/', (req, res) => req.user ? res.redirect('/app/') : res.render('landingpage', { user: req.user }))
app.get('/app', (req, res) => req.user ? res.render('app') : res.redirect('/'))

// serve our js and css resources
const serveStatic = require('serve-static')
app.use('/dist', serveStatic(__dirname + '/public/dist'))
app.use('/img', serveStatic(__dirname + '/public/img'))

// finally, expose our api routes
const users = require('./middleware/api/users')
const trips = require('./middleware/api/trips')
app.use('/api/v1/users', users)
app.use('/api/v1/trips', trips)

module.exports = app

if (!module.parent) {
  const port = SERVER_PORT
  app.listen(port, _ => console.log(`Server started on port ${port}`))
}
