// import
const express = require('express')
const path = require('path')

// import morgan dependencies for http request in console
const morgan = require('morgan')

// init express framework
const app = express()

// api routes
const userRoutes = require('./routes/user')

// cors request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// init app.js
app.use(express.json())
app.use(morgan('dev'))

module.exports = app

const port = 8000
app.listen(port, () =>
  console.log(`Application Node démarrée sur : http://localhost/${port}`)
)
