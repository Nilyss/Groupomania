// import models
const Article = require('../models/articles')
const User = require('../models/user')

module.exports.readArticle = (req, res) => {
  Article.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Can't get data : " + err)
    }
  })
}

module.exports.createArticle = async (req, res) => {
  const newPost = new Article({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(400).send(err)
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

module.exports.deleteArticle = (req, res) => {
  Article.findOneAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Can't delete article, error : " + err)
    }
  })
}

module.exports.likeArticle = async (req, res) => {
  try {
    await Article.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (err) {
          return res.status(400).send(err)
        }
      }
    )
    await User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.send(docs)
        } else {
          return res.status(400).send(err)
        }
      }
    )
  } catch (err) {
    console.log("Can't like article, error :  " + err)
  }
}

module.exports.unlikeArticle = async (req, res) => {
  try {
    await Article.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (err) {
          return res.status(400).send(err)
        }
      }
    )
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.send(docs)
        } else {
          return res.status(400).send(err)
        }
      }
    )
  } catch (err) {
    console.log("can't unlike article, error : " + err)
  }
}
