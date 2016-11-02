// load environment variables defined in .env
require('dotenv').load()

// set up the server
const express = require('express')
const app = express()

const logger = require('morgan')
app.use(logger('combined'))

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true // parse with `qs`, thus enabling stuff like arrays
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // save session when it's not initialized
  resave: false             // save the session back even when it's unmodified (check if store implements `touch`)
}))

// authentication and authorization via passwordless
const passwordless = require('passwordless')
const auth = require('./middleware/auth')

app.use(passwordless.sessionSupport())
app.use('/auth', auth)

// serve everything as a vuejs client-side app
// TODO: Exclude `public/node_modules`
const serveStatic = require('serve-static')
app.get('*', serveStatic(__dirname + '/public'))

module.exports = app

if (!module.parent) {
  const port = process.env.SERVER_PORT
  app.listen(port, _ => console.log(`Server started on port ${port}`))
}
