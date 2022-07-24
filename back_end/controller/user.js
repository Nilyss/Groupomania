// import dependencies
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const result = dotenv.config()

// import Middleware
const authMiddleware = require('../middleware/authJwt')

// import models
const User = require('../models/user')

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
    .catch((error) => res.status(400).json({ error: 'User creation failed' }))
}

exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid authentication' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Invalid authentication' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.TOKEN}`, {
              expiresIn: '12h',
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
