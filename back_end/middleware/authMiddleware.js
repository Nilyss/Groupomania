const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const result = dotenv.config()
const UserModel = require('../models/user')

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        res.cookie('jwt', '', { maxAge: 1 })
        next()
      } else {
        console.log('DECODED TOKEN =>', decodedToken, '<= END DECODED TOKEN')
        let user = await UserModel.findById(decodedToken.id)
        res.locals.user = user
        console.log(
          'res.locals.user =>',
          res.locals.user,
          '<= end res.locals.user'
        )
        console.log('user =>', user, '<= end user')
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err)
      } else {
        console.log(decodedToken.id)
        next()
      }
    })
  } else {
    console.log('No token provide')
  }
}
