// import dependencies
const mongoose = require('mongoose')

// article Schema
const articleSchema = mongoose.Schema(
  {
    user: { type: String },
    content: {
      type: String,
      required: true,
    },
    images: { type: String },
    date: { type: Date },
  },
  { collection: 'Articles' }
)

module.exports = mongoose.model('Articles', articleSchema)
