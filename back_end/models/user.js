// import dependencies
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'eMail address is required',
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
