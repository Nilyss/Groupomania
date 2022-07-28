import { UidContext } from '../../context/appContext'
import { useContext } from 'react'

// components
import Logout from '../logout/logout'

//css
import './_header.scss'

// images
import logoOrange from '../../assets/orange_logo.png'
import testPP from './testPP.webp'

export default function Header() {
  const uid = useContext(UidContext)

  return (
    <>
      <header className="homeHeader">
        <div className="showUser">
          <figure>
            <img className="showUser__pp" src={testPP} alt="profile" />
          </figure>
          <p className="showUser__name">Welcome '{uid}' !</p>
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
