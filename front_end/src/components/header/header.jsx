//css
import './_header.scss'

//logo
import logoOrange from '../../assets/orange_logo.png'

export default function Header() {
  return (
    <>
      <header className="homeHeader">
        <figure className="authBody__fig">
          <img
            className="homeMain__fig__logo"
            src={logoOrange}
            alt="logo Groupomania"
          />
        </figure>
      </header>
    </>
  )
}
