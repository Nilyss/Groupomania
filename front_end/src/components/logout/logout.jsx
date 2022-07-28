// dependencies
import axios from 'axios'
import cookie from 'js-cookie'

// css
import './_logout.scss'
// import { useNavigate } from 'react-router-dom'

export default function Logout() {
  axios.defaults.withCredentials = true
  // const navigate = useNavigate()

  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}logout`)
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))
    window.location = '/'
  }

  return (
    <>
      <button onClick={logout} className="logoutBtn">
        Log-out
      </button>
    </>
  )
}
