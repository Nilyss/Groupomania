// import dependencies
const express = require('express') // framework for node.js  https://www.npmjs.com/package/express
const bodyParser = require('body-parser') // body parsing middleware  https://www.npmjs.com/package/body-parser
const cors = require('cors') // cross origin request  https://www.npmjs.com/package/cors
const helmet = require('helmet') // hide API stacks in browser  https://www.npmjs.com/package/helmet
const mongoSanitize = require('express-mongo-sanitize') // block some key operator https://www.npmjs.com/package/express-mongo-sanitize
const dotenv = require('dotenv') // environment variable  https://www.npmjs.com/package/dotenv
const result = dotenv.config()

// dev dependencies
const morgan = require('morgan') // http middleware logger https://www.npmjs.com/package/morgan

// importDB - noSQL (mongoDB)
const mongoose = require('./db/dbConfig')

// configure routes
const apiRoute = '/api'
// const authRoute = '/auth'
const userRoute = require('./routes/user')

// start app
const app = express()

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
app.use(express.json())
app.use('/api', userRoute)

module.exports = app
