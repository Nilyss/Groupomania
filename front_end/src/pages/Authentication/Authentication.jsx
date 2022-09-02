import { UidContext } from '../../context/userIdContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//  import style
import '../../utils/styles/Authentication.css'

// import components
import SignUpModal from '../../components/form/signUpModal'
import SignInModal from '../../components/form/signInModal'

//  import img
import logo from '../../assets/icon-left-font-monochrome-black.png'

export default function Authentification() {
  const uid = useContext(UidContext)
  const navigate = useNavigate()

  if (uid) {
    navigate('/home', { replace: true })
  }

  return (
    <main className="authBody">
      <figure aria-label="logo" className="authBody__fig">
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
