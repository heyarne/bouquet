const router = require('express').Router()
const { isLoggedIn } = require('../session-utils')

router.get('/me', (req, res) => {
  if (isLoggedIn(req)) {
    res.status(200).json(req.user)
  } else {
    res.status(403).json({ message: 'No session established' })
  }
})

module.exports = router
