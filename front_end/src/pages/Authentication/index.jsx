//  import style
import '../../utils/styles/Authentication.css'

// import components
import SignUpModal from '../../components/form/signUpModal'
import SignInModal from '../../components/form/signInModal'

//  import img
import logo from '../../assets/icon-left-font-monochrome-black.png'

export default function Authentification() {
  return (
    <main className="authBody">
      <figure className="authBody__fig">
        <img
          className="authBody__fig__logo"
          src={logo}
          alt="logo Groupomania"
        />
      </figure>
      <SignUpModal />
      <SignInModal />
    </main>
  )
}
