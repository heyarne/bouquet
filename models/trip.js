const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  from: { type: Object, required: true },
  to: { type: Object, required: true },
  duration: { type: Object, required: true },
  availability: { type: Object, required: true }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = {
  tripSchema, Trip
}
