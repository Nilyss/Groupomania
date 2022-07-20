import { useContext, useState, useRef } from 'react'
import { UserContext } from '../../context/userContext'

// css
import './_signUpModal.scss'

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

  return (
    <>
      {modalState.signUpModal && (
        <section className="auth">
          <div className="auth__header">
            <h5 className="auth__header__title">Sign-Up</h5>
            <h5
              onClick={() => toggleModals('signIn')}
              className="auth__header__signIn"
            >
              Sign-In
            </h5>
          </div>
          <div className="auth__body">
            <form className="auth__body__form">
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
                  email address
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
                  placeholder="Enter your password"
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
                  type="texte"
                  className="formInput"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                />
                {/*<p className="auth__body__form__error">err</p>*/}
              </div>
              <button className="auth__body__form__submit">Register</button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
