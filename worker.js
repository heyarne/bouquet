/**
 * This project's worker takes the responsibility of providing results for
 * active trips (e.g. trips that are not in the past or deleted). It is meant to
 * be run periodically.
 *
 * TODO: Support multiple platforms (at the moment it's just skyscanner)
 */

require('dotenv').load()
const { MONGODB_URI, SKYSCANNER_API_KEY } = process.env

const util = require('util')
const fetch = require('node-fetch')
const debug = require('debug')('bouquet:worker')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, _ => console.log(`Mongoose connected to ${MONGODB_URI}`))

const { Trip } = require('./models/trip')
const { SearchResult } = require('./models/search-result')

function toSkyScannerDate (date) {
  const month = ('0' + (date.getMonth() + 1)).substr(-2)
  return `${date.getFullYear()}-${month}`
}

function convertDates (...dates) {
  return dates
    .filter(date => date != null) // we don't necessarily have an endDate
    .map(toSkyScannerDate)
    .join('/')
}

function skyScannerURL (trip) {
  const market = 'DE'
  const currency = 'EUR'
  const locale = 'en'
  const { departure, destination, startDate, endDate } = trip

  return `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${market}/${currency}/${locale}/${departure}/${destination}/${convertDates(startDate, endDate)}?apiKey=${SKYSCANNER_API_KEY}`
}

function searchSkyScanner (trip) {
  const url = skyScannerURL(trip)

  debug(`Requesting ${url}`)
  return fetch(url)
    // check the responses and reject the bad ones
    .then(res => Promise[res.ok ? 'resolve' : 'reject'](res.json()))
    // continue working with this result if everything's fine
    .then(response => Promise.resolve({ trip, response }))
    // if we have an error, resolve it and print it. we don't want it to stop
    // further processing though, so we catch it early
    .catch(err =>
      err.then(err => {
        console.error(`Bad response for ${trip._id}`)
        console.error(err)
        debug(util.inspect(err))
      })
    )
}

function handleResults (responses) {
  debug(`${responses.length} good responses`, util.inspect(responses))
  return Promise.all(responses
    .map(({ trip, response }) => {
      // save each returned result
      const quotes = response.Quotes
      const cheapest = quotes.sort((a, b) => a.MinPrice > b.MinPrice)[0]
      const currency = response.Currencies[0].Code
      const places = {}
      response.Places.forEach(place => { places[place.PlaceId] = place })

      if (cheapest) {
        // TODO: Notify user of this result if it's below thei
        return new SearchResult({
          trip: trip._id,
          date: new Date(cheapest.OutboundLeg.DepartureDate),
          departure: {
            name: places[cheapest.OutboundLeg.OriginId].Name,
            platformIdentifier: places[cheapest.OutboundLeg.OriginId].SkyscannerCode
          },
          destination: {
            name: places[cheapest.OutboundLeg.DestinationId].Name,
            platformIdentifier: places[cheapest.OutboundLeg.DestinationId].SkyscannerCode
          },
          platform: 'skyscanner',
          price: cheapest.MinPrice,
          currency
        })
        .save()
        .then(r => Promise.resolve(r._id))
      } else {
        // continue with `undefined` to signal that there's no result
        return Promise.resolve()
      }
    }))
}

function work () {
  debug('Requesting trip data...')
  // TODO: Get only trips starting at least now
  // get pending trips from database
  return Trip.find()
    .exec()
    // request trip data from skyscanner
    .then(trips => Promise.all(trips.map(searchSkyScanner)))
    // filter out the requests that went wrong
    .then(responses => Promise.resolve(responses.filter(res => res != null)))
    // get the responses that went well and went not so well and treat them accordingly
    .then(handleResults)
}

// if run from the command line...
if (!module.parent) {
  work()
    .then(ids => {
      debug(`All done!`)
      debug(`Saved ${ids.filter(i => i).length} new results`)
      process.exit(0)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
