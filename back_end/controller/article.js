// import models
const Article = require('../models/articles')
const User = require('../models/user')

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
  console.log('ARTICLE =>', req.body)
  const articleObject = req.body
  const article = new Article({
    ...articleObject,
    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  })
  article
    .save()
    .then(() => res.status(201).json({ message: 'Post saved !' }))
    .catch((error) => res.status(400).json({ error }))
}

// module.exports.createArticle = async (req, res) => {
//   const newPost = new Article({
//     posterId: req.body.posterId,
//     message: req.body.message,
//     video: req.body.video,
//     likers: [],
//     comments: [],
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${
//       req.file.filename
//     }`,
//   })
//
//   try {
//     const post = await newPost.save()
//     return res.status(201).json(post)
//   } catch (err) {
//     return res.status(400).send(err)
//   }
// }

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

module.exports.deleteArticle = (req, res) => {
  Article.findOne({ _id: req.params.id }).then((article) => {
    Article.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Article removed' }))
      .catch((error) => res.status(400).json({ error }))
  })
}
