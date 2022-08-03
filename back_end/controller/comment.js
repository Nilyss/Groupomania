const Article = require('../models/articles')
module.exports.commentPost = (req, res) => {
  try {
    return Article.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterFirstName: req.body.user.firstName,
            commenterLastName: req.body.user.lastName,
            message: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(400).send(err)
      }
    )
  } catch (err) {
    return res.status(400).send(err)
  }
}
