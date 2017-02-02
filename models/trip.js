const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const geojsonhint = require('@mapbox/geojsonhint')

const validPlace = {
  validator (v) {
    return v.geometry && !geojsonhint.hint(v).length
  },
  message: '{VALUE} is not a valid place'
}

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Airport for departure
  departure: {
    type: Object,
    required: [true, 'Please let us know where you want to depart from'],
    validate: validPlace
  },
  // Airport for destination
  destination: {
    type: Object,
    required: [true, 'Please tell us where you want to go to'],
    validate: validPlace
  }, // see above
  // Start of search
  startDate: {
    type: Date,
    required: [true, 'Please fill in your date of departure'],
    index: true
  },
  // End of search
  endDate: { type: Date, index: true },
  // Price for alerts
  budget: { type: Number },
  // Personal notes
  notes: { type: String },
  // should it be searched for at the moment?
  active: {
    type: Boolean,
    required: true,
    default: true,
    index: true
  },
  // the last time a user has been notified so we don't spam them
  lastNotification: { type: Date }
})

// add createdAt and updatedAt fields
tripSchema.plugin(timestamps)

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
