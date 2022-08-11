// dependencies
import axios from 'axios'
import cookie from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

// css
import './_logout.scss'

export default function Logout() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()

  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}logout`)
      .then(() => {
        removeCookie('jwt')
        navigate('/', { replace: true })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Link className="link" to={'/'}>
        <button onClick={logout} className="logoutBtn">
          Log-out
        </button>
      </Link>
    </>
  )
}
