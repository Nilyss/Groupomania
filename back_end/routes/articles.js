// import dependencies
const express = require('express')
const router = express.Router()

// import middleware
const multer = require('../middleware/multerConfig')

// import controller
const articleController = require('../controller/article')
const likeController = require('../controller/like')
const commentController = require('../controller/comment')

// routes
router.get('/articles', articleController.readArticles)
router.get('/articles/:id', articleController.readOneArticle)
router.post('/articles', multer, articleController.createArticle)
router.put('/articles/:id', articleController.updateArticle)
router.delete('/articles/:id', articleController.deleteArticle)

// likes route
router.post('articles/:id/like', likeController.likeArticle)

// comment routes
router.post('/articles/:id/comment', commentController.createComment)

module.exports = router
