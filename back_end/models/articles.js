const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      require: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterName: String,
          text: String,
          timestamp: Number,
        },
      ],
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Article', articleSchema)
