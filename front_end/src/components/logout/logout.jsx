// dependencies
import cookie from 'js-cookie'
import { Link } from 'react-router-dom'

// css
import './_logout.scss'

// api
import UserService from '../../api/Services/UserService'
const userServices = new UserService()

export default function Logout() {
  // remove token stored in cookies on http only if the backend  removing function didn't worked for safety
  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 })
    }
  }

  // request API and remove token from front-end and back-end
  const logout = async () => {
    try {
      await userServices.logoutUser()
      removeCookie('jwt')
    } catch (error) {
      console.log(error)
    }
  }

  // rendering DOM
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
