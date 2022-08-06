// import model
const Article = require('../models/articles')

exports.likeArticle = (req, res) => {
  console.log('A')
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      console.log('B')
      // if the user didn't like the article and click on like icon
      if (!article.likers.includes(req.body.user) && req.body.likes === 1) {
        Article.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 }, $push: { likers: req.body.user } }
        )
          .then(() => res.status(201).json({ message: 'The post was liked' }))
          .catch((error) => res.status(404).json({ error }))
      }
      // if the user want to remove is like
      if (article.likers.includes(req.body.user) && req.body.likes === 0) {
        Article.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { likers: req.body.user },
          }
        )
          .then(() => res.status(201).json({ message: 'The post was unliked' }))
          .catch((error) => res.status(404).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
