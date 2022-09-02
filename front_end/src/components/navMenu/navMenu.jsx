// libraries
import { useState } from 'react'
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

  // for accessibility if item is focus, by pressing space or enter, trigger the handleEditComment Function
  const keyDownhandleClick = (e) => {
    let code = e.which
    if (code === 13 || code === 32) {
      handleClick()
    }
  }

  return (
    <div className="navMenuModal">
      <FontAwesomeIcon
        tabIndex="0"
        role="button"
        onKeyDown={keyDownhandleClick}
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
          <h2 className="navMenuContainer__title">Menu</h2>
          <div className="navMenu__buttonContainer">
            <Link
              tabIndex="0"
              role="button"
              to={'/userSettings'}
              className="navMenuContainer__settings"
            >
              Settings
            </Link>
          </div>
          <Logout />
        </div>
      )}
    </div>
  )
}
