// import dependencies
const jsonWebToken = require('jsonwebtoken')

// import models
const User = require('../models/user')

exports.signUp = (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })
  user
    .save()
    .then(() => res.status(201).json({ message: 'User has been created' }))
    .catch((error) => res.status(400).json({ error: 'User creation failed' }))

    .catch((error) => res.status(500).json({ error: 'Server error' }))
}
