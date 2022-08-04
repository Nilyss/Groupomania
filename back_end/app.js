// import dependencies
const express = require('express') // framework for node.js  https://www.npmjs.com/package/express
const bodyParser = require('body-parser') // body parsing middleware  https://www.npmjs.com/package/body-parser
const cookieParser = require('cookie-parser') // cookies parsing middleware https://www.npmjs.com/package/cookie-parser
const cors = require('cors') // cross origin request  https://www.npmjs.com/package/cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}
const helmet = require('helmet') // hide API stacks in browser  https://www.npmjs.com/package/helmet
const mongoSanitize = require('express-mongo-sanitize') // block some key operator https://www.npmjs.com/package/express-mongo-sanitize
const dotenv = require('dotenv') // environment variable  https://www.npmjs.com/package/dotenv
const result = dotenv.config()
const path = require('path')

// dev dependencies
const morgan = require('morgan') // http middleware logger https://www.npmjs.com/package/morgan

// importDB - noSQL (mongoDB)
const mongoose = require('./db/dbConfig')

// import auth middleware
const { checkUser, requireAuth } = require('./middleware/authMiddleware')

// configure routes
const apiRoute = '/api'
const userRoute = require('./routes/user')
const articleRoute = require('./routes/articles')

// start app
const app = express()

app.use(helmet())
app.use(
  mongoSanitize({
    remplaceWith: '_',
  })
)
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

// jwt
app.get('*', checkUser)
app.get('/api/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api', userRoute)
app.use('/api', articleRoute)

module.exports = app
