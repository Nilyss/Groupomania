// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const userController = require('../controller/user')

router.post('/signup', userController.signUp)
router.post('/signIn', userController.signIn)

module.exports = router
