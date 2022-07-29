// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const articleController = require('../controller/article')

// routes
router.get('/articles', articleController.readArticle)
router.post('/articles', articleController.createArticle)
router.put('/articles/:id', articleController.updateArticle)
router.delete('/articles/:id', articleController.deleteArticle)
router.patch('article/like-articles/:id', articleController.likeArticle)
router.patch('article/unlike-articles/:id', articleController.unlikeArticle)

module.exports = router
