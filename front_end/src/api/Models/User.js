export default class User {
  constructor(data) {
    this._id = data._id
    this._firstName = data.firstName
    this._lastName = data.lastName
    this._email = data.email
    this._profilePicture = data.profilePicture
    this._isAdmin = data.isAdmin
    this._uid = data.uid
  }

  get id() {
    return this._id
  }
  get firstName() {
    return this._firstName
  }
  get lastName() {
    return this._lastName
  }
  get email() {
    return this._email
  }
  get profilePicture() {
    return this._profilePicture
  }
  get isAdmin() {
    return this._isAdmin
  }
}
