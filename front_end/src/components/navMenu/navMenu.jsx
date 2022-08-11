// libraries
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// components
import Logout from '../logout/logout'

// css
import './_navMenu.scss'

export default function NavMenu() {
  return (
    <div className="navMenuContainer">
      <h4 className="navMenuContainer__title">Menu</h4>
      <div className="navMenu__buttonContainer">
        <Link to={'/userSettings'} className="navMenuContainer__settings">
          Settings
        </Link>
      </div>
      <Logout />
    </div>
  )
}
