import axios from 'axios'

// using redux for verify if user is legit with user token in cookies (http only)
export const GET_USER = 'GET_USER'
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8000/api/users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}
