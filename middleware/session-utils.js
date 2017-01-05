const { User } = require('../models/user')

/**
 * Middleware that exposes the user as `req.user` if there is a session.
 * @param  {[type]}  req  [description]
 * @param  {[type]}  res  [description]
 * @param  {[type]}  next [description]
 * @return {Boolean}      [description]
 */
function exposeCurrentUser (req, res, next) {
  const { email } = req.session
  if (email) {
    User.findOne({ email }).exec()
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
}

/**
 * Tells whether a user is logged in. Needs to be called after
 * `exposeCurrentUser` has been mounted.
 * @param  {[type]}  req [description]
 * @return {Boolean}     [description]
 */
function isLoggedIn (req) {
  return !!req.user
}

module.exports = {

  isLoggedIn,
  exposeCurrentUser () {
    return exposeCurrentUser
  }

}
