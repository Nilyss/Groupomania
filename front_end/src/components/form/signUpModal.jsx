import { useContext, useState, useRef } from 'react'
import { UserContext } from '../../context/userContext'
import Axios from 'axios'

// css
import './_forms.scss'

Axios.defaults.baseURL = 'http://localhost:8000/api'

export default function SignUpModal() {
  const { toggleModals, modalState } = useContext(UserContext)
  const [validation, setValidation] = useState('')

  // push all inputs from form into inputs variable
  const inputs = useRef([])
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const formRef = useRef()

  const handleForm = (e) => {
    e.preventDefault()

    if (
      (inputs.current[3].value.length || inputs.current[4].value.length) < 8 ||
      (inputs.current[3].value.length || inputs.current[4].value.length) > 16
    ) {
      setValidation('Password must have between 8 and 16 characters')
    } else if (inputs.current[3].value !== inputs.current[4].value) {
      setValidation('Passwords do not match')
    } else {
      try {
        const userData = {
          firstName: inputs.current[0].value,
          lastName: inputs.current[1].value,
          email: inputs.current[2].value,
          password: inputs.current[3].value,
        }

        Axios.post(`/auth/signup`, userData)
        toggleModals('signIn')
      } catch (err) {}
    }
  }

  return (
    <>
      {modalState.signUpModal && (
        <section className="auth">
          <div className="auth__header">
            <h5
              onClick={() => toggleModals('signIn')}
              className="auth__header__btn"
            >
              Sign-In
            </h5>
            <h5 className="auth__header__title">Sign-Up</h5>
          </div>
          <div className="auth__body">
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
                  ref={addInputs}
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
                  ref={addInputs}
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
                  ref={addInputs}
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
                  ref={addInputs}
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
                  ref={addInputs}
                  name="password"
                  required
                  type="password"
                  className="formInput"
                  id="confirmPassword"
                  placeholder="Confirm your insane password"
                />
                <p className="auth__body__form__error">{validation}</p>
              </div>
              <button className="auth__body__form__submit">Register</button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
