// libraries
import { useContext, useState } from 'react'
import { FormContext } from '../../context/formContext'
import { useNavigate } from 'react-router-dom'

//css
import './_forms.scss'
import { PostContext } from '../../context'

// api
import UserService from '../../api/Services/UserService'
const userServices = new UserService()

export default function SignInModal() {
  // context
  const { getUser } = useContext(PostContext)

  // init hooks
  const { toggleModals, modalState } = useContext(FormContext)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // sign In form submit
  async function handleForm(e) {
    e.preventDefault()
    try {
      const userData = {
        email: e.target['mail'].value,
        password: e.target['password'].value,
      }

      await userServices.connectUser(userData)
      getUser()
      navigate('/home', { replace: true })
    } catch (err) {
      setError(
        ' Invalid log-in: Please check your email and password. If you forgot them, contact your administrator '
      )
    }
  }

  //  rendering DOM
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
                <p
                  className="auth__body__form__error"
                  style={{ marginBottom: '1em' }}
                >
                  {error}
                </p>
              </div>
              <button className="auth__body__form__submit">Enter</button>
              <div className="createAccount">
                <p className="createAccount__p">No account ? </p>
                <p
                  className="createAccount__create"
                  onClick={() => toggleModals('signUp')}
                >
                  Create one !
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
