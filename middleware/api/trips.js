const router = require('express').Router()
const { requireLogin, checkTripPermissions } = require('../session-utils')
const { Trip } = require('../../models/trip')
const { SearchResult } = require('../../models/search-result')

router.post('/', requireLogin(), (req, res) => {
  const user = req.user._id
  const { departure, destination, startDate, endDate, notes } = req.body

  new Trip({ user, departure, destination, startDate, endDate, notes })
    .save()
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
        res.status(422).json(errors)
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

router.get('/:id', requireLogin(), checkTripPermissions(), (req, res) => {
  const { id } = req.params
  const tripQuery = Trip.findById({ _id: id }).lean()
  const resultQuery = SearchResult.find({ trip: id }).sort({ createdAt: -1 }).limit(30).lean(true)
  Promise.all([ tripQuery, resultQuery ])
    .then(([ trip, searchResults ]) => {
      trip.results = searchResults
      res.status(200).json(trip)
    })
})

router.put('/:id', requireLogin(), checkTripPermissions(), (req, res) => {
  const { startDate, endDate, budget, notes } = req.body
  const payload = { startDate }
  if (endDate) payload.endDate = endDate
  if (budget) payload.budget = budget
  if (notes) payload.notes = notes

  Trip.findOneAndUpdate({ _id: req.params.id }, payload)
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors)
          .map(k => err.errors[k])
        res.status(422).json(errors)
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

router.delete('/:id', requireLogin(), checkTripPermissions(), (req, res) => {
  // TODO: Remove from req.user.trips
  Trip.remove({ _id: req.params.id })
    .then(res.status(200).end())
    .catch(err => res.status(500).json({ message: err.message }))
})

module.exports = router
