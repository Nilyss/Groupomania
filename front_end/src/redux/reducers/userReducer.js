import { GET_USER } from '../actions/userActions'

// using redux for verify if user is legit with user token in cookies (http only)

const initialState = {}

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    default:
      return state
  }
}
