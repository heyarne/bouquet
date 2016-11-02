const passwordless = require('passwordless')
const { Router } = require('express')

// TODO
const User = {
  find () {
    console.error('User model is not implemented')
    return Promise.reject(new Error('Not yet implemented'))
  }
}

const router = Router()

router.get('/login', (req, res) => {/* TODO: Render login screen */})
router.post(
  '/login',
  passwordless.requestToken((email, delivery, done) =>
    User.find({ email })
      // .limit(1)
      .then(user => done(null, user.id))
      .catch(err => done(err))
  ),
  (req, res) => {/* TODO: Render "password sent" screen */},
  { failureRedirect: '/login' }
)

router.get('/token', passwordless.acceptToken({ successRedirect: '/' }))
router.get('/logout', passwordless.logout(), (req, res) => res.redirect('/'))

module.exports = router
