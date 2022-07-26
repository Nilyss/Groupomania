// import dependencies
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const result = dotenv.config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`)
    const userId = decodedToken.userId
    req.auth = { userId: userId }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'invalid user ID'
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}
