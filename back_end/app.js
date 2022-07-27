// import dependencies
const express = require('express') // framework for node.js  https://www.npmjs.com/package/express
const bodyParser = require('body-parser') // body parsing middleware  https://www.npmjs.com/package/body-parser
const cookieParser = require('cookie-parser') // cookies parsing middleware https://www.npmjs.com/package/cookie-parser
const cors = require('cors') // cross origin request  https://www.npmjs.com/package/cors
const helmet = require('helmet') // hide API stacks in browser  https://www.npmjs.com/package/helmet
const mongoSanitize = require('express-mongo-sanitize') // block some key operator https://www.npmjs.com/package/express-mongo-sanitize
const dotenv = require('dotenv') // environment variable  https://www.npmjs.com/package/dotenv
const result = dotenv.config()

// dev dependencies
const morgan = require('morgan') // http middleware logger https://www.npmjs.com/package/morgan

// importDB - noSQL (mongoDB)
const mongoose = require('./db/dbConfig')

// import middleware
const { checkUser } = require('./middleware/authMiddleware')

// configure routes
const apiRoute = '/api'
const userRoute = require('./routes/user')
const articlesRoute = require('./routes/articles')

// start app
const app = express()

// jwt
app.get('*', checkUser)

app.use(helmet())
app.use(
  mongoSanitize({
    remplaceWith: '_',
  })
)
app.use(cors())
app.options('*', cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', userRoute)
app.use('/api/auth', articlesRoute)

module.exports = app
