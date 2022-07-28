import { useSelector } from 'react-redux'

// components
import Logout from '../logout/logout'

//css
import './_header.scss'

// images
import logoOrange from '../../assets/orange_logo.png'

export default function Header() {
  const userData = useSelector((state) => state.userReducer)

  return (
    <>
      <header className="homeHeader">
        <div className="showUser">
          <figure>
            <img
              className="showUser__pp"
              src={userData.profilePicture}
              alt="profile"
            />
          </figure>
          <p className="showUser__name">Welcome {userData.firstName} !</p>
        </div>
        <figure className="authBody__fig">
          <img
            className="homeMain__fig__logo"
            src={logoOrange}
            alt="logo Groupomania"
          />
        </figure>
        <Logout />
      </header>
    </>
  )
}
