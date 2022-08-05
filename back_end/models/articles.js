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
    likes: {
      type: Number,
      default: 0,
    },
    likers: {
      type: [String],
      require: true,
    },
    comments: {
      type: new mongoose.Schema(
        {
          commenterId: String,
          commenterFirstName: String,
          commenterLastName: String,
          text: String,
        },
        {
          timestamps: true,
        }
      ),
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Article', articleSchema)
