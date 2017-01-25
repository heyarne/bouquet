const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Airport for departure
  departure: {
    type: Object,
    required: [true, 'Please let us know where you want to depart from']
  }, // actually type: feature
  // Airport for destination
  destination: {
    type: Object,
    required: [true, 'Please tell us where you want to go to']
  }, // see above
  // Start of search
  startDate: {
    type: Date,
    required: [true, 'Please fill in your date of departure'],
    index: true
  },
  // End of search
  endDate: { type: Date, index: true },
  // Duration of trip
  duration: { type: Object },
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
  }
})

// add createdAt and updatedAt fields
tripSchema.plugin(timestamps)

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
