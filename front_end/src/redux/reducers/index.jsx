import { combineReducers } from 'redux'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import articleReducer from './articleReducer'

export default combineReducers({ userReducer, usersReducer, articleReducer })
