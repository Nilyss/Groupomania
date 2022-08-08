// import models
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
      .then(() => res.status(201).json({ message: 'Post saved !' }))
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
      .then(() => res.status(201).json({ message: 'Post saved !' }))
      .catch((error) => res.status(400).json({ error }))
  }
}

module.exports.updateArticle = (req, res) => {
  const updatedRecord = {
    message: req.body.message,
  }
  Article.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log('Update error : ' + err)
      }
    }
  )
}

module.exports.deleteOneArticle = (req, res) => {
  Article.findOne({ _id: req.params.id }).then((article) => {
    console.log('ARTICLE.PICTURE =>', article.picture)
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
