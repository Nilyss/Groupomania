const jwt = require('jsonwebtoken')
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
        console.log('DECODED TOKEN =>', decodedToken)
        let user = await UserModel.findById(decodedToken.id)
        res.locals.user = user
        console.log('res.locals.user')
        console.log(user)
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}
