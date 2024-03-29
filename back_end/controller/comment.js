const Article = require('../models/articles')

module.exports.createComment = async (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
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

module.exports.editComment = async (req, res) => {
  Article.findOne({
    _id: req.params.id,
  })
    .then((article) => {
      Article.updateOne(
        { _id: req.params.id, 'comments._id': req.body.commentId },
        {
          $set: { 'comments.$.text': req.body.text },
        }
      )
        .then(() => res.status(200).json({ message: 'Comment updated !' }))
        .catch((error) => res.status(404).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

module.exports.deleteComment = async (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      Article.updateOne(
        { _id: req.params.id },
        { $pull: { comments: { _id: req.body.commentId } } }
      )
        .then(() => res.status(201).json({ message: 'Comment delete !' }))
        .catch((error) => res.status(404).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
