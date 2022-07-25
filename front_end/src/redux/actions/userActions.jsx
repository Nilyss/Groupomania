import Axios from 'axios'

export const GET_USER = 'GET_USER'
export const getUser = (uid) => {
  return (dispatch) => {
    return Axios.get(`http://localhost:8000/api/auth/users/${uid}`)
  }
}
