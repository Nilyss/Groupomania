// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const articlesController = require('../controller/articles')

router.post('/articles', articlesController.articles)

module.exports = router
