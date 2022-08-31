// import dependencies
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

// import Middleware
const authMiddleware = require('../middleware/authMiddleware')

// import Models
const User = require('../models/user')

// create token and defined duration of him
const maxAge = 3 * 24 * 60 * 1000
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  })
}

exports.signUp = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
  user
    .save()
    .then(() => res.status(201).json({ message: 'User has been created' }))
    .catch((error) => res.status(400).json(error + 'user creation failed'))
}

exports.signIn = (req, res) => {
  try {
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid authentication' })
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: 'Invalid authentication ' })
        }
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ user: user._id })
      })
    })
  } catch (err) {
    res.status(401).json({ message: 'Invalid authentication' })
  }
}

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.status(200).json(users)
}

exports.getUserData = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  res.status(200).json(user)
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 1 })
  res.redirect('/')
}

module.exports.updateUser = (req, res) => {
  const userObject = req.file
    ? {
        profilePicture: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'User updated' }))
    .catch((error) => res.status(400).json({ error }))
}

module.exports.deleteUser = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    const filename = user.profilePicture.split('/images')[1]
    fs.unlink(`images/${filename}`, () => {
      User.deleteOne({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ message: "User and user's data has been delete" })
        })
        .catch((error) => res.status(400).json({ error }))
    })
    // }
    if (!user) {
      res.status(404).json({ message: 'No user to delete' })
    }
  })
}
