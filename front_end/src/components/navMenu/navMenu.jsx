//css
import './_navMenu.scss'

export default function NavMenu() {
  return (
    <>
      <article className="navMenu">
        <nav className="navMenu__nav">
          <ul>
            <li className="navMenu__nav__ul__li">Home</li>
            <li className="navMenu__nav__ul__li">Profile</li>
            <li className="navMenu__nav__ul__li">Logout</li>
          </ul>
        </nav>
      </article>
    </>
  )
}
