/**
 * This project's worker takes the responsibility of providing results for
 * active trips (e.g. trips that are not in the past or deleted). It is meant to
 * be run periodically.
 *
 * TODO: Support multiple platforms (at the moment it's just skyscanner)
 * TODO: Notifications (Web UI + E-Mail)
 */

require('dotenv').load()
const { MONGODB_URI, SKYSCANNER_API_KEY } = process.env

const util = require('util')
const fetch = require('node-fetch')
const debug = require('debug')('bouquet:worker')
const mongoose = require('mongoose')
const moment = require('moment')
const Throttle = require('promise-parallel-throttle')

const { Trip } = require('./models/trip')
const { User } = require('./models/user')
const { SearchResult } = require('./models/search-result')

// configure mongoose
mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, _ => console.log(`Mongoose connected to ${MONGODB_URI}`))

// configure mail
const mailer = require('nodemailer').createTransport({
  sendmail: true,
  newline: 'unix',
  path: process.env.SENDMAIL_PATH || '/usr/sbin/sendmail'
})

//
// search and notification logic
//

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

function skyScannerTripURL (trip, [ departure, destination ]) {
  const market = 'DE'
  const currency = 'EUR'
  const locale = 'en'
  const { startDate, endDate } = trip
  const service = endDate ? 'browsegrid' : 'browsequotes'

  return `http://partners.api.skyscanner.net/apiservices/${service}/v1.0/
    ${market}/${currency}/${locale}/${departure}/
    ${destination}/${convertDates(startDate, endDate)}
    ?apiKey=${SKYSCANNER_API_KEY}`.replace(/\s+/g, '')
}

function skyScannerPlaceId ({ properties: {layer, label} }) {
  const url = `http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/DE/EUR/en/
    ?api_key=ar476997332973333998634946946081
    &query=${encodeURIComponent(label)}`.replace(/\s+/g, '')
  return fetch(url)
    .then(res => res.json())
    .then(body => {
      if (!body.Places.length) return

      // for "towns, hamlets, cities", return the first result
      // for bigger areas, we need to return all finegrained results (e.g. countries are not supported for the grid)
      const places = (layer === 'locality')
        ? body.Places.slice(0, 1)
        : body.Places.filter(place => place.CityId !== '-sky')

      return places.map(p => p.PlaceId)
    })
}

function searchSkyScanner (trip) {
  return Promise.all([ skyScannerPlaceId(trip.departure), skyScannerPlaceId(trip.destination) ])
    // combine [ a, b ] x [ b, c ] to [[ab], [ac], [bc]] so departure and arrival place is always different
    .then(([as = [], bs = []]) =>
      (as.length === 0 || bs.length === 0)
        ? []
        : as.map(a =>
            bs.filter(b => b !== a)
              .map(b => [ a, b ])
            ).reduce((a, b) => a.concat(b), [])) // flatten one level
    .then(combinations => {
      if (!combinations.length) {
        debug(`Skipping search because no place id is found`)
        return Promise.resolve([])
      }

      const requests = combinations.map(combo => () => {
        const url = skyScannerTripURL(trip, combo)
        debug(`Requesting ${url}`)
        return fetch(url)
          // check the responses and reject the bad ones
          .then(res => Promise[res.ok ? 'resolve' : 'reject'](res.json()))
          // continue working with this result if everything's fine
          .then(response => ({ trip, response, url }))
          // if we have an error, resolve it and print it. we don't want it to stop
          // further processing though, so we catch it early
          .catch(err => {
            console.error(`Bad response for ${trip._id}`)
            console.error(err)
            debug(util.inspect(err))
          })
      })
      return Throttle.all(requests, 3)
    })
}

function cheapestFromQuotes ({response, trip, url}) {
  const quotes = response.Quotes
  const currency = response.Currencies[0].Code
  const places = {}
  response.Places.forEach(place => { places[place.PlaceId] = place })

  // TODO: Subtract duration of trip if there is any
  const cheapest = quotes
    .filter(quote => quote.OutboundLeg) // take only non-return journeys
    .filter(quote => new Date(quote.OutboundLeg.DepartureDate).getTime() >= trip.startDate.getTime())
    .filter(quote => trip.endDate
      ? new Date(quote.OutboundLeg.DepartureDate).getTime() <= trip.endDate.getTime()
      : true
    )
    .sort((a, b) => a.MinPrice > b.MinPrice)[0]

  if (cheapest) {
    return {
      trip: trip._id,
      createdAt: new Date(),
      date: new Date(cheapest.OutboundLeg.DepartureDate),
      platform: 'skyscanner',
      url: url.replace(/browse[^/]+/, 'referral'),
      quoteDate: cheapest.QuoteDateTime,
      price: cheapest.MinPrice,
      currency
    }
  }
}

function cheapestFromGrid ({response, trip, url}) {
  const currency = response.Currencies[0].Code
  const departures = response.Dates[0].slice(1) // undefined, { DateString: ... }, { DateString: ... }
  const cheapest = response.Dates.slice(1) // { DateString: ... }, undefined, { MinPrice: ..., QuoteTime: ... }, ...
    // transform the grid for all non-undefined values
    .map(row =>
      row.slice(1).map((date, i) => date && {
        'departure': departures[i].DateString,
        'return': date.DateString,
        'price': date.MinPrice,
        'quoteDate': date.QuoteDateTime
      })
    )
    // flatten the array
    .reduce((a, b) => a.concat(b), [])
    // filter out nulls
    .filter(r => r)
    // sort by price ascending
    .sort((a, b) => a.price > b.price)[0]

  if (cheapest) {
    return {
      trip: trip._id,
      createdAt: new Date(),
      date: new Date(cheapest.departure),
      platform: 'skyscanner',
      url: url.replace(/browse[^/]+/, 'referral'),
      quoteDate: cheapest.quoteDate,
      price: cheapest.price,
      currency
    }
  }
}

function getCheapestForTrip (results) {
  debug(`${results.length} good responses` + (results.length ? ` for ${results[0].trip._id}` : ''))

  return results
    // get cheapest price for all urls that were requested for a single trip
    .map(({ trip, response, url }) => trip.endDate
      ? cheapestFromGrid({ trip, response, url })
      : cheapestFromQuotes({ trip, response, url }))
    // sort all cheapest results ascending by price and return only the very cheapest
    .sort((a, b) => a.price > b.price)[0]
}

/**
 * Removes trips older than a month and deactivates the ones that's in the past
 * @return {Promise}
 */
function cleanupOldtrips () {
  debug('Cleaning up old trips')
  const today = moment().startOf('day')
  return Trip.where({ endDate: { $lt: today.subtract(1, 'month').format() } })
    .remove()
    .exec()
    .then(_ =>
      Trip.where({ endDate: { $lt: today.subtract(1, 'month').format() } })
        .update({ active: false }, { multi: true })
        .exec()
    )
}

/**
 * Goes through all the currently active trips and searches for the cheapest
 * results that match the trips criteria.
 * @return {Promise}
 */
function findCurrentResults () {
  debug('Requesting trip data...')
  // TODO: Improve trip cleanup and filtering
  // get pending trips from database
  return Trip.find({ active: true })
    .exec()
    // request trip data from skyscanner, returns data like [[r11, r12, r13...], [r21, r22...], ...]
    .then(trips => Promise.all(trips.map(searchSkyScanner)))
    // get cheapest result for each trip
    .then(results => results.map(getCheapestForTrip))
}

/**
 * Sends an e-mail
 * @param  {String} to       Receiver
 * @param  {String} subject  Subject line
 * @param  {String} text     E-Mail content
 * @return {Promise}         Promise representing the status of the sent e-mail
 */
function sendMail ({ to, subject, text }) {
  return new Promise((resolve, reject) => {
    const mailConfig = {
      from: process.env.MAIL_SENDER,
      subject,
      text,
      to
    }
    mailer.sendMail(mailConfig, (err, result) => err ? reject(err) : resolve(result))
  })
}

/**
 * Returns the text to be used as the body as a notification mail
 * @param  {User} user
 * @param  {SearchResult} result
 * @return {String}
 */
function notificationText ({ user, result }) {
  return `Hi ${user.email}!

Remember your trip to ${result.trip.destination.properties.label}?
We found an offer that suits your expectations!

To view the offer directly, go to the following link:
${result.url}

If you'd like to take a look at your trip, you can use this link:
${process.env.BASE_URL}/app/#/trip/${result.trip._id}/status

Have fun and stay safe!

Regards,
Arne from bouquet`
}

/**
 * Goes through all search results of this run and sends out the notifications
 * to the users who created the trips, if appropriate
 * @param  {ObjectId[]} resultIds An array of search result ids
 * @return {Promise}
 */
function sendNotifications (resultIds) {
  debug('Sending notifications...')
  const lastWeek = moment().subtract(7, 'days')
  return SearchResult.find({ _id: { $in: resultIds } })
    .populate('trip')
    .then(results => Promise.all(
      results
        .filter(r => r.price <= r.trip.budget)
        .filter(r => r.trip.lastNotification == null || r.trip.lastNotification <= lastWeek)
        .map(result => User.findOne(result.trip.user).exec() // mongoose `populate` method goes only one level deep
          .then(user => sendMail({
            to: user.email,
            subject: `Remember your trip to ${result.trip.destination.properties.label}?`,
            text: notificationText({ user, result })
          }))
          .then(mail => Trip.update({ _id: result.trip._id }, { lastNotification: new Date() }).exec())
        )
    ))
}

// if run from the command line...
if (!module.parent) {
  cleanupOldtrips()
    .then(findCurrentResults)
    // save all trip data for which we found matching results
    .then(results => {
      const r = results.filter(r => r) || []
      if (r.length) {
        return SearchResult.collection.insert(r)
      } else {
        return { insertedCount: 0, insertedIds: [] }
      }
    })
    // print out for stats
    .then(writeResult => {
      debug(`Saved ${writeResult.insertedCount} new results`)
      return writeResult.insertedIds
    })
    .then(sendNotifications)
    .then(alarmResult => debug(`Sent ${alarmResult.length} notifications`))
    .then(_ => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
