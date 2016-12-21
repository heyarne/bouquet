const mongoose = require('mongoose')
const Trip = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Trip',
  required: true
}

const Place = {
  // human-readable name
  name: { type: String, required: true },
  // internal code used on the platform
  platformIdentifier: String
}

const searchResultSchema = new mongoose.Schema({
  // which one is the trip that caused this search?
  trip: Trip,
  // when can we go?
  date: { type: Date, required: true },
  // where do we go from?
  departure: { type: Place, required: true },
  // where do we land?
  destination: { type: Place, required: true },
  // where do we have the result from?
  platform: { type: String, required: true },
  // how much does it cost?
  price: { type: Number, required: true },
  currency: { type: String, required: true }
})

const SearchResult = mongoose.model('SearchResult', searchResultSchema)

module.exports = {
  searchResultSchema, SearchResult
}
