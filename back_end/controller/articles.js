// import Middleware
const authMiddleware = require('../middleware/authJwt')

// import models
const Articles = require('../models/user')

exports.articles = (req, res) => {
  const article = new Articles({
    user: req.body.user,
    content: req.body.content,
    images: req.body.images,
    date: req.body.date,
  })
  article
    .save()
    .then(() => res.status(201).json({ message: 'Article has been post' }))
    .catch((error) => res.status(400).json({ error: 'Post article : failure' }))
}
