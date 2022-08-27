// import dependencies
const express = require('express')
const router = express.Router()

// import middleware
const multer = require('../middleware/multerConfig')

// import controller
const userController = require('../controller/user')

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/logout', userController.logout)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserData)
router.put('/users/:id', multer, userController.updateUser)
router.delete('/users/:id', multer, userController.deleteUser)

module.exports = router
