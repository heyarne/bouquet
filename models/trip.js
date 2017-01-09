const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Airport for departure
  departure: { type: String, required: true },
  // Airport for destination
  destination: { type: String, required: true },
  // Start of search
  startDate: { type: Date, required: true },
  // End of search
  endDate: { type: Date },
  // Duration of trip
  duration: { type: Object },
  // should it be searched for at the moment?
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

// add createdAt and updatedAt fields
tripSchema.plugin(timestamps)

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
