const mongoose = require('mongoose')
const { tripSchema } = require('./trip')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  trips: [tripSchema]
})

userSchema.statics = {
  findOrCreate (conditions, options) {
    return User.findOne(conditions).exec()
      .then(user => user
        ? Promise.resolve(user)
        : new User(Object.assign({}, conditions, options)).save())
  }
}

const User = mongoose.model('User', userSchema)

module.exports = {
  userSchema, User
}
