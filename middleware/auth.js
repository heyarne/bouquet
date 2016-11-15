/**
 * This implements auth using Portier (https://portier.io), a spiritual
 * successor to Mozilla Persona. It's basically a port of the python version,
 * which can be found here:
 * https://github.com/portier/demo-rp/tree/894501d93b5ff9effaf837e18456816d675e2aee
 */
const querystring = require('querystring')
const jwt = require('jsonwebtoken')
const jkwToPem = require('jwk-to-pem')
const fetch = require('node-fetch')
const uuid = require('uuid')
const redis = require('redis').createClient()

const User = require('../models/user')

const debug = require('debug')('bouquet:auth')
const router = require('express').Router()

/**
 * Converts an object holding JSON Webkeys to an object in the form
 * Key ID -> Key, where key must be RS256
 * @param  {Object} jwks
 * @return {Object}
 */
function mapKeyIdsToPem ({ keys }) {
  const val = {}
  keys
    .filter(key => key.alg === 'RS256')
    .forEach(key => val[key.kid] = jkwToPem(key))
  return val
}

/**
 * Discover and return a Broker's public keys.
 *
 * Portier brokers implement the `OpenID Connect Discovery`_ specification.
 * This function follows that specification to discover the broker's current
 * cryptographic public keys:
 *
 * 1. Fetch the Discovery Document from ``/.well-known/openid-configuration``.
 * 2. Parse it as JSON and read the ``jwks_uri`` property.
 * 3. Fetch the URL referenced by ``jwks_uri`` to retrieve a `JWK Set`_.
 * 4. Parse the JWK Set as JSON and extract keys from the ``keys`` property.
 *
 * Portier currently only supports keys with the ``RS256`` algorithm type.
 *
 * .. _OpenID Connect Discovery:
 *     https://openid.net/specs/openid-connect-discovery-1_0.html
 * .. _JWK Set: https://tools.ietf.org/html/rfc7517#section-5
 *
 * Again, this is a port of the python version. Check the above link for
 * additional info.
 *
 * @param  {String}   broker URL of the broker
 * @param  {Function} cb   Callback to be invoked with a map of key id to public key instance
 * @return {Promise}
 */
function discoverKeys (broker) {
  debug('Discovering keys')
  return new Promise((resolve, reject) => {
    // check cache
    const cacheKey = `jwks:${broker}`
    redis.get(cacheKey, jwks => {
      if (jwks == null) {
        debug(`Cached key not found, fetching from ${broker}`)
        // discover the keys as per the OpenID protocol and cache them for future requests
        fetch(`${broker}/.well-known/openid-configuration`)
          .then(res => res.json())
          .then(res => {
            if (res.jwks_uri == null) {
              throw new Error('No jwks_uri in discovery document')
            }

            debug(`Key URL is ${res.jwks_uri}`)
            return fetch(res.jwks_uri)
          })
          .then(res => res.json())
          .then(jwks => {
            if (jwks.keys == null) {
              throw new Error('No keys found in JWK Set')
            }

            // the response is in a different format, we need to transform it first
            const keys = mapKeyIdsToPem(jwks)
            debug('Got keys!')
            redis.set(cacheKey, JSON.stringify(keys), 'EX', 60 * 5)
            resolve(keys)
          })
          .catch(err => reject(err))
        return
      }

      debug('Found keys in cache')
      resolve(jwks)
    })
  })
}

/**
 * Validate an Identity Token (JWT) and return its subject (email address).
 *
 * In Portier, the subject field contains the user's verified email address.
 *
 * This functions checks the authenticity of the JWT with the following steps:
 *
 * 1. Verify that the JWT has a valid signature from a trusted broker.
 * 2. Validate that all claims are present and conform to expectations:
 *
 *  - ``aud`` (audience) must match this website's origin.
 *  - ``iss`` (issuer) must match the broker's origin.
 *  - ``exp`` (expires) must be in the future.
 *  - ``iat`` (issued at) must be in the past.
 *  - ``sub`` (subject) must be an email address.
 *  - ``nonce`` (cryptographic nonce) must not have been seen previously.
 *
 * 3. If present, verify that the ``nbf`` (not before) claim is in the past.
 *
 * Timestamps are allowed a few minutes of leeway to account for clock skew.
 *
 * This demo relies on the `PyJWT`_ library to check signatures and validate
 * all claims except for ``sub`` and ``nonce``. Those are checked separately.
 *
 * .. _PyJWT: https://github.com/jpadilla/pyjwt
 *
 * @param   {String}  token  The JWT issued by Portier
 * @return  {Promise}
 */
function getVerifiedEmail (token) {
  return discoverKeys(process.env.PORTIER_BROKER_URL)
    .then(keys => {
      const [ rawHeader ] = token.split('.')
      const header = JSON.parse(new Buffer(rawHeader, 'base64'))
      const pubKey = keys[header.kid]

      if (pubKey == null) throw new Error(`Cannot find public key with ID ${header.kid}`)

      const verifyOpts = {
        audience: process.env.BASE_URL,
        issuer: process.env.PORTIER_BROKER_URL
      }
      return new Promise((resolve, reject) =>
        jwt.verify(token, pubKey, verifyOpts, (err, { email }) => err ? reject(err) : resolve(email))
      )
    })
}

router.post('/login', (req, res) => {
  const { email } = req.body

  // generate random uuid and save it for 15 minutes
  const nonce = uuid.v4()
  redis.set(nonce, '', 'EX', 60 * 15)

  // generate payload for portier and redirect
  const payload = {
    'login_hint': email,
    'scope': 'openid email',
    'nonce': nonce,
    'response_type': 'id_token',
    'response_mode': 'form_post',
    'client_id': process.env.BASE_URL,
    'redirect_uri': process.env.BASE_URL + '/auth/verify'
  }

  const portierURL = process.env.PORTIER_BROKER_URL + '/auth?' + querystring.stringify(payload)

  debug(`Redirecting ${email} to portier at ${process.env.PORTIER_BROKER_URL}`)
  return res.redirect(portierURL)
})

router.post('/verify', (req, res, next) => {
  // first check if we've got an error from the broker
  const { error, error_description } = req.params
  if (error != null) {
    // TODO: Proper error handling (not in this middleware)
    res
      .status(400)
      .json({ error: `Broker Error (${error}): ${error_description}` })
    return next()
  }

  // if not, check the JWT
  const jwt = req.body.id_token
  getVerifiedEmail(jwt)
    .then(email => User.findOrCreate({ email }))
    .then(user => {
      req.session.email = user.email
      res.redirect('/')
      next()
    })
    .catch(err => next(err))
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
