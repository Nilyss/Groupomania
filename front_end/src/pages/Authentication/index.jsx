//  import style
import '../../utils/styles/Authentication.css'

// import components
import SignUpModal from '../../components/form/signUpModal'

//  import img
import logo from '../../assets/icon-left-font-monochrome-black.png'

export default function Authentification(props) {
  return (
    <body className="authBody">
      <figure className="authBody__fig">
        <img
          className="authBody__fig__logo"
          src={logo}
          alt="logo groupomania"
        />
      </figure>
      <SignUpModal />
    </body>
  )
}
