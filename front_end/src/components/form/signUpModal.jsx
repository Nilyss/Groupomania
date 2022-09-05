// libraries
import { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormContext } from '../../context/formContext'

// css
import './_forms.scss'

// api
import UserService from '../../api/Services/UserService'
const userServices = new UserService()

export default function SignUpModal() {
  const { toggleModals, modalState } = useContext(FormContext)
  const [error, setError] = useState('')
  const [validation, setValidation] = useState('')

  // push all inputs from form into inputs variable

  // init hooks
  const formRef = useRef()
  const navigate = useNavigate()

  //sign up form submit
  const handleForm = async (e) => {
    e.preventDefault()
    setError('')
    if (
      (e.target['password'].value.length ||
        e.target['confirmPassword'].value.length) < 8 ||
      (e.target['password'].value.length ||
        e.target['confirmPassword'].value.length) > 16
    ) {
      setError(
        '1 number, 1 uppercase letters, 1 lowercase letters, 1 non-alpha numeric number, between 8 and 16 characters with no space'
      )
    } else if (
      e.target['password'].value !== e.target['confirmPassword'].value
    ) {
      setError('Passwords do not match')
    } else {
      try {
        const userData = {
          firstName: e.target['firstName'].value,
          lastName: e.target['lastName'].value,
          email: e.target['mail'].value,
          password: e.target['password'].value,
        }
        await userServices.createUser(userData)
        e.target['firstName'].value = ''
        e.target['lastName'].value = ''
        e.target['mail'].value = ''
        e.target['password'].value = ''
        e.target['confirmPassword'].value = ''

        setValidation('Account successfully created')
      } catch (err) {
        setError('An error occurs. Try again later')
        navigate('/', { replace: true })
      }
    }
  }

  // rendering DOM
  return (
    <>
      {modalState.signUpModal && (
        <section className="auth">
          <div className="auth__header">
            <button
              onClick={() => toggleModals('signIn')}
              className="auth__header__btn"
            >
              Sign-In
            </button>
            <h1 className="auth__header__title">Sign-Up</h1>
          </div>
          <div className="auth__body">
            <h2 className="auth__body__title">Create your account</h2>
            <form
              onSubmit={handleForm}
              ref={formRef}
              className="auth__body__form"
            >
              <div className="auth__body__form__container">
                <label htmlFor="firstName" className="formLabel">
                  First Name
                </label>
                <input
                  name="firstName"
                  required
                  type="text"
                  className="formInput"
                  id="firstName"
                  placeholder="Rick"
                />
              </div>
              <div className="auth__body__form__container">
                <label htmlFor="lastName" className="formLabel">
                  Last Name
                </label>
                <input
                  name="lastName"
                  required
                  type="text"
                  className="formInput"
                  id="lastName"
                  placeholder="DECKARD"
                />
              </div>
              <div className="auth__body__form__container">
                <label htmlFor="signUpMail" className="formLabel">
                  eMail address
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
              <div className="auth__body__form__container">
                <label htmlFor="confirmPassword" className="formLabel">
                  Confirm password
                </label>
                <input
                  name="confirmPassword"
                  required
                  type="password"
                  className="formInput"
                  id="confirmPassword"
                  placeholder="Confirm your insane password"
                />
                <p className="auth__body__form__valid">{validation}</p>
                <p className="auth__body__form__error">{error}</p>
              </div>
              <button className="auth__body__form__submit">Register</button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
