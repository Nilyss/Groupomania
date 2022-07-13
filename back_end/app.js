// import dependencies
const express = require('express') // framework for node.js  https://www.npmjs.com/package/express
const bodyParser = require('body-parser') // body parsing middleware  https://www.npmjs.com/package/body-parser
const cors = require('cors') // cross origin request  https://www.npmjs.com/package/cors
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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: /http:\/\/localhost/,
  })
)
app.options('*', cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api', userRoute)

module.exports = app
