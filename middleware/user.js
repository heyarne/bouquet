const User = require('../models/user')

/**
 * Exposes the user as `res.user` if there is a session.
 * @param  {Request} req
 * @param  {Response} res
 */
module.exports = () =>
  function exposeUserMiddleware (req, res, next) {
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
