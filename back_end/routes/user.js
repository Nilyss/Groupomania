// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const userController = require('../controllers/user')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

module.exports = router
