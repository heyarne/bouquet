const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Airport for departure
  departure: { type: Object, required: true }, // actually type: feature
  // Airport for destination
  destination: { type: Object, required: true }, // see above
  // Start of search
  startDate: { type: Date, required: true, index: true },
  // End of search
  endDate: { type: Date, index: true },
  // Duration of trip
  duration: { type: Object },
  // Price for alerts
  budget: { type: Number },
  // should it be searched for at the moment?
  active: {
    type: Boolean,
    required: true,
    default: true,
    index: true
  }
})

// add createdAt and updatedAt fields
tripSchema.plugin(timestamps)

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
