// import model
const Article = require('../models/articles')

module.exports.likeArticle = (req, res) => {
  Article.findOne({ _id: req.params.id }).then((article) => {
    // if the user didn't like the post and click on like
    if (!article.likers.includes(req.body.likerId) && req.body.like === 1) {
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { likers: req.body },
        }
      )
        .then(() => res.status(201).json({ message: 'The post was Liked' }))
        .catch((error) => res.status(500).json({ error }))
    }

    // if the user want unlike post
    else if (
      article.likers.find((likers) => likers.likerId === req.body.likerId) &&
      req.body.like === 0
    ) {
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { likers: { likerId: req.body.likerId } },
        }
      )
        .then(() => res.status(200).json({ message: 'The post was unliked' }))
        .catch((error) => res.status(500).json({ error }))
    }
    // if the user want to dislike a post
    if (
      !article.disLikers.includes(req.body.disLikerId) &&
      req.body.like === -1
    ) {
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { disLikers: req.body },
        }
      )
        .then(() => res.status(201).json({ message: 'The post was disliked' }))
        .catch((error) => res.status(500).json({ error }))
    }

    // if the user want ton undislike a post
    else if (
      article.disLikers.find(
        (dislikers) => dislikers.disLikerId === req.body.disLikerId
      ) &&
      req.body.like === 0
    ) {
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: -1 },
          $pull: { disLikers: { disLikerId: req.body.disLikerId } },
        }
      )
        .then(() =>
          res.status(200).json({ message: 'The post was undisliked' })
        )
        .catch((error) => res.status(500).json({ error }))
    }
  })
}
