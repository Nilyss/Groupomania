// import model
const Article = require('../models/articles')

module.exports.likeArticle = (req, res) => {
  console.log('CLICK LIKE')
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      // if the user didn't already like the post and click on the like button
      article.likers.find((e) => console.log('e =>', e))
      if (!article.likers.find((e) => e.likerId === req.body.likerId)) {
        Article.updateOne(
          { _id: req.params.id },
          {
            $inc: {
              likes: 1,
            },
            $push: {
              likers: req.body,
            },
          }
        )
          .then(() => res.status(201).json({ message: 'Post liked !' }))
          .catch((error) => res.status(404).json({ error }))
      }
      // if the user already like the post and click on the like button
      if (article.likers.find((e) => e.likerId === req.body.likerId)) {
        Article.updateOne(
          { _id: req.params.id },
          {
            $inc: {
              likes: -1,
            },
            $pull: {
              likers: req.body,
            },
          }
        )
          .then(() => res.status(200).json({ message: 'Post unliked !' }))
          .catch((error) => res.status(404).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
