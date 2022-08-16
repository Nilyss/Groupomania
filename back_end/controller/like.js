// import model
const Article = require('../models/articles')

module.exports.likeArticle = (req, res) => {
  // console.log
  console.log('CLICK LIKE')
  console.log('REQ.PARAMS =>', req.params)
  console.log('REQ.BODY =>', req.body)

  Article.findOne({ _id: req.params.id }).then((article) => {
    // if the user didn't like the post and click on like
    if (!article.likers.includes(req.body.likerId) && req.body.like === 1) {
      console.log('IF DIDNT LIKE AND LIKE POST')
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { likers: req.body },
        }
      )
        .then(() => res.status(201).json({ message: 'The post was Liked' }))
        .catch((error) => res.status(404).json({ error }))
    }
    // if the user want unlike post
    else if (
      article.likers.find((likers) => likers.likerId === req.body.likerId) &&
      req.body.like === 0
    ) {
      console.log('IF UNLIKE POST')
      Article.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { likers: { likerId: req.body.likerId } },
        }
      )
        .then(() => res.status(200).json({ message: 'The post was unliked' }))
        .catch((error) => res.status(404).json({ error }))
    }
  })
}
