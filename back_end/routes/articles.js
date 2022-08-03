// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const articleController = require('../controller/article')
const likeController = require('../controller/like')

// routes
router.get('/articles', articleController.readArticles)
router.post('/articles', articleController.createArticle)
router.put('/articles/:id', articleController.updateArticle)
router.delete('/articles/:id', articleController.deleteArticle)

// likes
router.post('/:id/like', likeController.likeArticle)

module.exports = router
