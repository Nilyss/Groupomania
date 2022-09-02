export default class Article {
  constructor(data) {
    this._id = data._id
    this._posterId = data.posterId
    this._message = data.message
    this._picture = data.picture
    this._likes = data.likes
    this._dislikes = data.dislikes
    this._likers = data.likers
    this._disLikers = data.disLikers
    this._comments = data.comments
    this._createdAt = data.createdAt
    this._updatedAt = data.updatedAt
  }

  get id() {
    return this._id
  }
  get posterId() {
    return this._posterId
  }
  get message() {
    return this._message
  }
  get picture() {
    return this._picture
  }
  get likes() {
    return this._likes
  }
  get dislikes() {
    return this._dislikes
  }
  get likers() {
    return this._likers
  }
  get disLikers() {
    return this._disLikers
  }
  get comments() {
    return this._comments
  }
  get createdAt() {
    return this._createdAt
  }
  get updatedAt() {
    return this._updatedAt
  }
}
