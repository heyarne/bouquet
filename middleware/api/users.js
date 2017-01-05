const router = require('express').Router()
const { requireLogin } = require('../session-utils')

router.get('/me', requireLogin(), (req, res) => res.status(200).json(req.user))

module.exports = router
