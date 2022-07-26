import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

//css
import './_forms.scss'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function SignInModal() {
  const { toggleModals, modalState } = useContext(UserContext)

  const navigate = useNavigate()

  function handleForm(e) {
    e.preventDefault()
    try {
      const userData = {
        email: e.target['mail'].value,
        password: e.target['password'].value,
      }
      axios.post('/auth/signin/', userData).then((res) => {
        if (res.status === 200) {
          navigate('/home', { replace: true })
        } else {
          console.error('invalid identification')
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {modalState.signInModal && (
        <section className="auth">
          <div className="auth__header">
            <h5 className="auth__header__title">Sign-In</h5>
            <h5
              onClick={() => toggleModals('signUp')}
              className="auth__header__btn"
            >
              Sign-Up
            </h5>
          </div>
          <div className="auth__body">
            <form onSubmit={handleForm} className="auth__body__form">
              <div className="auth__form__container">
                <div className="auth__body__form__container">
                  <label htmlFor="signUpMail" className="formLabel">
                    User identification
                  </label>
                  <input
                    name="mail"
                    required
                    type="email"
                    className="formInput"
                    id="signUpMail"
                    placeholder="electricsheep1968@nexus.com"
                  />
                </div>
                <div className="auth__body__form__container">
                  <label htmlFor="password" className="formLabel">
                    Password
                  </label>
                  <input
                    name="password"
                    required
                    type="password"
                    className="formInput"
                    id="password"
                    placeholder="Enter your incredible password"
                  />
                </div>
              </div>
              <button className="auth__body__form__submit">Enter</button>
              <Link to="#">Forgot Password ?</Link>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
