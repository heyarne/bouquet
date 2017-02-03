const mongoose = require('mongoose')

const searchResultSchema = new mongoose.Schema({
  // which one is the trip that caused this search?
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
    index: true
  },
  // when can we go?
  date: { type: Date, required: true },
  // where do we have the result from?
  platform: { type: String, required: true },
  // url to link back to in order to see the result on the platform
  url: { type: String },
  // how much does it cost?
  price: { type: Number, required: true },
  // what currency is the price in?
  currency: { type: String, required: true },
  // is it a cached result? if yes, from when is the hit?
  quoteDate: { type: Date }
})

const SearchResult = mongoose.model('SearchResult', searchResultSchema)

module.exports = {
  searchResultSchema, SearchResult
}
