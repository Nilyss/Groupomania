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

    likes: { type: Number, default: 0 },

    dislikes: { type: Number, default: 0 },

    likers: {
      type: Array({ likerId: String }),
      require: true,
    },

    disLikers: {
      type: Array({ dislikerId: String }),
      require: true,
    },

    comments: {
      type: Array({
        commenterId: String,
        commenterFirstName: String,
        commenterLastName: String,
        commenterProfilePicture: String,
        text: String,
      }),
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Article', articleSchema)
