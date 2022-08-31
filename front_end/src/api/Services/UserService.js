import User from '../Models/User'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiCall'

export default class UserService {
  // ********** User request **********

  // get request
  async getUser() {
    const req = await getRequest('/users')
    const res = req.data
    return res.map((data) => new User(data))
  }
  async getUserIdFromToken() {
    const reqUid = await getRequest('/jwtid')
    const resUid = reqUid.data
    const reqUserData = await getRequest('/users/' + resUid)
    return reqUserData.data
  }
  async logoutUser() {
    return await getRequest('/logout')
  }

  // post request
  async createUser(data) {
    return await postRequest('/signup', data)
  }
  async connectUser(data) {
    return await postRequest('/signin', data)
  }

  // put request
  async editUser(id, data) {
    return await putRequest('/users/' + id, data)
  }

  // delete request
  async deleteUser(id) {
    return await deleteRequest('/users/' + id)
  }
}
