const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({ email: String })

UserSchema.statics = {
  findOrCreate (conditions, options) {
    return User.findOne(conditions).exec()
      .then(user => user
        ? Promise.resolve(user)
        : new User(Object.assign({}, conditions, options)).save())
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
