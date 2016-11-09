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

// authentication and authorization via passwordless
const passwordless = require('passwordless')
const TokenStore = require('passwordless-mongostore')
const auth = require('./middleware/auth')

// used for sending the tokens
const email = require('emailjs')
const smtp = email.server.connect({
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: !!process.env.SMTP_ENABLE_SSL
})

passwordless.init(new TokenStore(process.env.MONGODB_URI))
passwordless.addDelivery((token, uid, recipient, done) => {
  debug('Sending token', { token, uid, recipient })
  smtp.send({
    from: 'bouquet <noreply@localhost>',
    to: recipient,
    subject: 'Sign in to bouquet',
    text: `Hello!

You can access your bouquet account with the following link:
${process.env.BASE_URL}/auth/login?token=${token}&uid=${encodeURIComponent(uid)}`
  }, err => err
    ? console.error('Error when sending mail', err)
    : done()) //  TODO: This callback looks weird. Check https://github.com/florianheinemann/passwordless again
})

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
