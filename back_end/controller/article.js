// import Models
const Article = require('../models/articles')
const fs = require('fs')

module.exports.readArticles = (req, res) => {
  Article.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Can't get data : " + err)
    }
  })
}

module.exports.readOneArticle = async (req, res) => {
  Article.findOne({ _id: req.params.id }).then((article) =>
    res.status(200).json(article)
  )
}

module.exports.createArticle = (req, res) => {
  const articleObject = req.body
  if (req.body.file === 'null') {
    const article = new Article({
      ...articleObject,
    })
    article
      .save()
      .then(() => res.status(201).json({ message: 'Article saved !' }))
      .catch((error) => res.status(400).json({ error }))
  } else {
    const article = new Article({
      ...articleObject,
      picture: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    })
    article
      .save()
      .then(() => res.status(201).json({ message: 'Article saved !' }))
      .catch((error) => res.status(400).json({ error }))
  }
}

module.exports.updateArticle = (req, res) => {
  const articleObject = req.file
    ? {
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  Article.updateOne(
    { _id: req.params.id },
    { ...articleObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Article updated' }))
    .catch((error) => res.status(400).json({ error }))
}

module.exports.deleteOneArticle = (req, res) => {
  Article.findOne({ _id: req.params.id }).then((article) => {
    if (article.picture === undefined) {
      Article.deleteOne({ _id: req.params.id }).then(() =>
        res.status(200).json({ message: 'The post has been deleted' })
      )
    } else {
      const filename = article.picture.split('/images')[1]
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: 'The post has been deleted' })
          )
          .catch((error) => res.status(400).json({ error }))
      })
    }
    if (!article) {
      res.status(404).json({ message: 'No article to remove' })
    }
  })
}
