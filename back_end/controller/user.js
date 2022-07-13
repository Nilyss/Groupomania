// import dependencies
const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// import models
const User = require('../models/user')

exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: hash,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'User has been created' }))
        .catch((error) =>
          res.status(400).json({ error: 'User creation failed' })
        )
    })
    .catch((error) => res.status(500).json({ error: 'Server error' }))
}
