import axios from 'axios'

export const GET_USER = 'GET_USER'
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}
