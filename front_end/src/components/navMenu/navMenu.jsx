// libraries
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

// components
import Logout from '../logout/logout'

// css
import './_navMenu.scss'

export default function NavMenu() {
  const [toggleMenu, setToggleMenu] = useState(false)

  const handleClick = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <div className="navMenuModal">
      <FontAwesomeIcon
        onClick={handleClick}
        icon={faBars}
        className="fa-2x navMenuModal__icon"
      />
      {toggleMenu && (
        <div
          className="navMenuContainer"
          style={{
            width: '100%',
          }}
        >
          <h4 className="navMenuContainer__title">Menu</h4>
          <div className="navMenu__buttonContainer">
            <Link to={'/userSettings'} className="navMenuContainer__settings">
              Settings
            </Link>
          </div>
          <Logout />
        </div>
      )}
    </div>
  )
}
