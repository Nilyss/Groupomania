// import model
const Article = require('../models/articles')

exports.likeArticle = (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      // if the user didn't like the article and click on like icon
      if (!article.likers.includes(req.body.likerId) && req.body.like === 1) {
        Article.updateOne(
          { _id: req.params.id },
          { $push: { likers: req.body } }
        )
          .then(() => res.status(201).json({ message: 'The post was liked' }))
          .catch((error) => res.status(404).json({ error }))
      }

      // if the user want to remove is like
      else {
        console.log('req.body, unlike route =>', req.body)
        Article.updateOne(
          { _id: req.params.id },
          { $pull: { likers: req.body } }
        )
          .then(() => res.status(200).json({ message: 'The post was unliked' }))
          .catch((error) => res.status(404).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
