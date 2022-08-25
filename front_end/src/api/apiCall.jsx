// libraries
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/jons'
axios.defaults.timeout = 6000
axios.defaults.withCredentials = true

const setRequest = (val) => {
  const config = {
    params: {},
  }
  if (val) {
    config.params = val
  }
  return config
}

export const getRequest = async (url, val = null) => {
  return await axios.get(url, { ...setRequest(val) })
}

export const postRequest = async (url, data = null, val = null) => {
  return await axios.post(url, data, { ...setRequest(val) })
}

export const deleteRequest = async (url, val = null) => {
  return await axios.delete(url, { ...setRequest(val) })
}

export const putRequest = async (url, data = null, val = null) => {
  return await axios.put(url, data, { ...setRequest(val) })
}
