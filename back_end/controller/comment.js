const Article = require('../models/articles')

module.exports.createComment = async (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      console.log('REQ.PARAMS', req.params)
      console.log('REQ.BODY', req.body)

      Article.updateOne(
        { _id: req.params.id },
        {
          $push: {
            comments: req.body,
          },
        }
      )
        .then(() => res.status(201).json({ message: 'Comment sent !' }))
        .catch((error) => res.status(404).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
