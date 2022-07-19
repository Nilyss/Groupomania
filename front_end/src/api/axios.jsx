//import dependencies
import axios from 'axios'

export default axios.create({
  baseUrl: `http://localHost:${process.env.API_PORT}/api`,
})
