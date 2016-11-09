const User = require('../models/user')

/**
 * Exposes the user as `res.user` if there is a session.
 * @param  {Request} req
 * @param  {Response} res
 */
module.exports = (req, res, next) => {
  if (req.session.email) {
    User.find({ email: req.session.email }).exec()
      .then(user => {
        req.user = user
        next()
      })
    .catch(err => next(err))
  } else {
    next()
  }
}
