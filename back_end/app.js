// import dependencies
const express = require('express') // https://www.npmjs.com/package/express
const bodyParser = require('body-parser') // https://www.npmjs.com/package/body-parser
const cors = require('cors') // https://www.npmjs.com/package/cors
const dotenv = require('dotenv') // https://www.npmjs.com/package/dotenv
const result = dotenv.config()
const JsonPackage = require('./package.json')

// dev dependencies
const morgan = require('morgan') // https://www.npmjs.com/package/morgan

//  select port for our API & API Root
const apiRoute = '/api'

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

// configure routes
const router = express.Router()
router.get('/', (req, res) => {
  res.send(`${JsonPackage.name} - v${JsonPackage.version}`)
})

// register routes
app.use(apiRoute, router)
