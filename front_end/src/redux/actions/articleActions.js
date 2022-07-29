// dependencies
import axios from 'axios'

// articles
export const GET_ARTICLES = 'GET_ARTICLES'

export const getArticles = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}articles`)
      .then((res) => {
        dispatch({ type: GET_ARTICLES, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

// comment
