import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:8000/api'

// sign up -> post request
export const signUpRequest = Axios.post('/api/auth/signup')

// sign in -> post request
export const signInRequest = Axios.post('/api/auth/signin')
