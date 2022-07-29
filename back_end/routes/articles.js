// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const articleController = require('../controller/article')

// routes
router.get('/article', articleController.readArticle)
router.post('/article', articleController.createArticle)
router.put('/article/:id', articleController.updateArticle)
router.delete('/article/:id', articleController.deleteArticle)
router.patch('article/like-article/:id', articleController.likeArticle)
router.patch('article/unlike-article/:id', articleController.unlikeArticle)

module.exports = router
