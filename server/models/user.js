var mongoose = require('mongoose')

var user = {
  email: {
    type: String,
    required: [true, 'email cannot empty']
  },
  password: {
    type: String,
    required: [true, 'password cannot be null'],
    min: [4, `min 4 character for password`]
  },
  role: {
    type: String,
    default: 'user'
  }
}

var userSchema = mongoose.Schema(user)

var User = mongoose.model('User', userSchema)

module.exports = User
