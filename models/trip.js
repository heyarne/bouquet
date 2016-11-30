const mongoose = require('mongoose')
const { userSchema } = require('./user')

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Airport for departure
  departure: { type: Object, required: true },
  // Airport for destination
  destination: { type: Object, required: true },
  // Start of search
  startDate: { type: Object, required: true },
  // End of search
  endDate: { type: Object },
  // Duration of trip
  duration: { type: Object }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
