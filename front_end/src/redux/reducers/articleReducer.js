import { GET_ARTICLES } from '../actions/articleActions'

const initialState = {}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return action.payload

    default:
      return state
  }
}
