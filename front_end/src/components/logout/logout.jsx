// dependencies
import cookie from 'js-cookie'
import { Link } from 'react-router-dom'

// css
import './_logout.scss'

// api
import { getRequest } from '../../api/apiCall'
import apiEndpoints from '../../api/apiEndpoints'

export default function Logout() {
  // remove token stored in cookies on http only if the backend didn't worked for safety
  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 })
    }
  }

  // request API and remove token from front-end and back-end
  const logout = async () => {
    try {
      await getRequest(apiEndpoints.logout)
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
