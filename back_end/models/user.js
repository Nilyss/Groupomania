// import dependencies
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

// regular expression

const isValidEmail = (email) => {
  const regexEmail =
    /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // RFC 5322 regex validation
  return regexEmail.test(email)
}

const isValidPassword = (password) => {
  const regexPassword =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^s]){8,16}$/ // 1 number, 1 uppercase letters, 1 lowercase letters, 1 non-alpha numeric number, between 8 and 16 characters with no space
  return regexPassword.test(password)
}

// userSchema
const userSchema = new Schema({
    firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [isValidEmail, 'Please, indicate an valid mail address'],
  },
  password: {
    type: String,
    required: true,
    validate: [
      isValidPassword,
      "'Password must contain at least : 1 number, 1 uppercase letters, 1 lowercase letters, 1 non-alpha numeric number, between 8 and 16 characters with no space",
    ],
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
})

// hash password with bcrypt, before saving it in dataBase

userSchema.pre('save', async function (next) {
  const rounds = 10
  this.password = await bcrypt.hash(this.password, rounds)
  next()
})

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

module.exports = mongoose.model('User', userSchema)
