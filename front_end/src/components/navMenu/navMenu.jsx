// libraries
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// css
import './_navMenu.scss'

export default function NavMenu() {
  return (
    <div className="navMenuContainer">
      <Link to={'/userSettings'} className="navMenuContainer__settings">
        Settings
      </Link>
    </div>
  )
}
