const router = require('express').Router()
const { isLoggedIn } = require('../session-utils')
const { Trip } = require('../../models/trip')

router.post('/', (req, res) => {
  // TODO: DRY
  if (!isLoggedIn(req)) {
    return res.status(403).json({ message: 'No session established' })
  }

  const payload = {
    user: req.user._id,
    departure: req.body.departure,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration
  }

  console.log(payload)

  new Trip(payload).save()
    .then(trip => res.status(201).json(trip))
    .catch(({ message }) => res.status(500).json({ message }))
})

module.exports = router
