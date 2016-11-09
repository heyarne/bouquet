const passwordless = require('passwordless')
const { Router } = require('express')
const User = require('../models/user')

const debug = require('debug')('bouquet:auth')
const router = Router()

router.get('/login', passwordless.acceptToken({ successRedirect: '/' }))

router.post(
  '/login',
  passwordless.requestToken((email, delivery, next) => {
    debug(`Searching user matching ${email}`)
    User.findOrCreate({ email })
      .then(user => next(null, user.id))
      .catch(err => {
        debug(`Error when searching for ${email}`)
        next(err)
      })
  }, { failureRedirect: '/' }),
  (req, res) => {/* TODO: Render "password sent" screen */}
)

router.get('/logout', passwordless.logout(), (req, res) => res.redirect('/'))

module.exports = router
