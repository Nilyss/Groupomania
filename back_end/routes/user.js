// import dependencies
const express = require('express')
const router = express.Router()

// import controller
const userController = require('../controller/user')

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/logout', userController.logout)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserData)

module.exports = router
