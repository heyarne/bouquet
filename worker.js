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
  const month = ('0' + date.getMonth() + 1).substr(-2)
  const day = ('0' + date.getDate()).substr(-2)
  return `${date.getFullYear()}-${month}-${day}`
}

function searchSkyScanner (trip) {
  const market = 'DE'
  const currency = 'EUR'
  const locale = 'en'
  const { departure, destination, startDate, endDate } = trip

  const url = `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${market}/${currency}/${locale}/${departure}/${destination}/` +
    [ startDate, endDate ]
      .filter(date => date != null) // we don't necessarily have an endDate
      .map(toSkyScannerDate)
      .join('/') +
    `?apiKey=${SKYSCANNER_API_KEY}`

  debug(`Requesting ${url}`)
  return fetch(url)
    // check the responses and reject the bad ones
    .then(res => Promise[res.ok ? 'resolve' : 'reject'](res.json()))
    // continue working with this result if everything's fine
    .then(response => Promise.resolve({ trip, response }))
    // remove invalid results from database
    .catch(err => {
      err.then(err => {
        console.error(`Bad response for ${trip._id}`)
        console.error(util.inspect(err))
      })
    })
}

function handleResults (responses) {
  debug(`${responses.length} good responses`, util.inspect(responses))
  responses
    .filter(res => res != null)
    .forEach(({ trip, response }) => {
      // save each returned result
      const quotes = response.Quotes
      const currency = response.Currencies[0].Code
      const places = {}
      response.Places.forEach(place => { places[place.PlaceId] = place })

      // TODO: Notify user of this result and handle error
      return Promise.all(quotes.map(quote =>
          new SearchResult({
            trip: trip._id,
            date: new Date(quote.OutboundLeg.DepartureDate),
            departure: {
              name: places[quote.OutboundLeg.OriginId].Name,
              platformIdentifier: places[quote.OutboundLeg.OriginId].SkyscannerCode
            },
            destination: {
              name: places[quote.OutboundLeg.DestinationId].Name,
              platformIdentifier: places[quote.OutboundLeg.DestinationId].SkyscannerCode
            },
            platform: 'skyscanner',
            price: quote.MinPrice,
            currency
          }).save()
        )
      )
      .then(results => {
        const ids = results.map(r => r._id)
        debug(`Saved results with ids ${ids.join(', ')}`)
      })
      .catch(err => console.error(err))
    })
}

function work () {
  debug('Requesting trip data...')
  // TODO: Get only trips starting at least now
  // get pending trips from database
  Trip.find()
    .exec()
    // request trip data from skyscanner
    .then(trips => Promise.all(trips.map(searchSkyScanner)))
    // get the responses that went well and went not so well and treat them accordingly
    .then(handleResults)
    .catch(err => console.error(err))
}

// if run from the command line...
if (!module.parent) {
  work()
}
