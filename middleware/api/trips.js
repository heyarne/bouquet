const router = require('express').Router()
const { requireLogin } = require('../session-utils')
const { Trip } = require('../../models/trip')
const { SearchResult } = require('../../models/search-result')

router.post('/', requireLogin(), (req, res) => {
  const payload = {
    user: req.user._id,
    departure: req.body.departure,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration
  }

  new Trip(payload).save()
    .then(trip => {
      // update the user and re-return the trip
      req.user.trips.push(trip._id)
      return req.user.save().then(_ => Promise.resolve(trip))
    })
    .then(trip => res.status(201).json(trip))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors)
          .map(k => err.errors[k])
        res.status(400).json(errors)
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

router.get('/me', requireLogin(), (req, res) => {
  Trip.find({ _id: { $in: req.user.trips } })
    .lean()
    .then(trips => Promise.all(trips.map(trip =>
      SearchResult.findOne({ trip: trip._id })
        .sort('-createdAt')
        .then(result => {
          trip.lastResult = result
          return trip
        })
    )))
    .then(trips => res.status(200).json(trips))
    .catch(({ message }) => res.status(500).json({ message }))
})

router.get('/:id', requireLogin(), (req, res) => {
  if (req.user.trips.indexOf(req.params.id) === -1) {
    res.status(403).json({ message: 'You\'re not allowed to access this' })
  }

  const { id } = req.params.id
  const tripQuery = Trip.findOne(id).lean()
  const resultQuery = SearchResult.find({ tripQuery: id }).sort({ createdAt: -1 }).limit(30).lean(true)
  Promise.all([ tripQuery, resultQuery ])
    .then(([ trip, searchResults ]) => {
      trip.results = searchResults
      res.status(200).json(trip)
    })
})

module.exports = router
