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
    .then(trip => {
      // update the user and re-return the trip
      req.user.trips.push(trip._id)
      return req.user.save().then(_ => Promise.resolve(trip))
    })
    .then(trip => res.status(201).json(trip))
    .catch(({ message }) => res.status(500).json({ message }))
})

router.get('/me', (req, res) => {
  // TODO: DRY
  if (!isLoggedIn(req)) {
    return res.status(403).json({ message: 'No session established' })
  }

  Trip.find({ _id: { $in: req.user.trips } })
    .then(trips => res.status(200).json(trips))
    .catch(({ message }) => res.status(500).json({ message }))
})

module.exports = router
