// import dependencies
const dotenv = require('dotenv')
const result = dotenv.config()
const mongoose = require('mongoose') // https://www.npmjs.com/package//mongoose

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTERNAME}.qo91n.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log('MongoDB connected')
    } else {
      console.log('MongoDB failed to connect ! Error : ' + err)
    }
  }
)

module.exports = mongoose
