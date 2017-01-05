const { User } = require('../models/user')

/**
 * Middleware that exposes the user as `req.user` if there is a session.
 * @param  {Request}   req  [description]
 * @param  {Response}  res  [description]
 * @param  {Callback}  next [description]
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
 * @param  {Request}  req [description]
 * @return {Boolean}     [description]
 */
function isLoggedIn (req) {
  return !!req.user
}

/**
 * Middleware that unsures a user is logged in. `exposeCurrentUser` still needs
 * to be mounted manually! If a user is not logged in, returns a code 403 and an
 * error message.
 * @param  {Request}   req  [description]
 * @param  {Response}  res  [description]
 * @param  {Callback}  next [description]
 */
function requireLogin (req, res, next) {
  if (isLoggedIn(req)) {
    return next()
  } else {
    return res.status(403).json({ message: 'Not logged in.' })
  }
}

module.exports = {
  isLoggedIn,
  requireLogin () {
    return requireLogin
  },
  exposeCurrentUser () {
    return exposeCurrentUser
  }
}
