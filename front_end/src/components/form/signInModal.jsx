import { useContext, useRef, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'
import Axios from 'axios'

//css
import './_forms.scss'

Axios.defaults.baseURL = 'http://localhost:8000/api'

export default function SignInModal() {
  const { toggleModals, modalState } = useContext(UserContext)

  // push all inputs from form into inputs variable
  const inputs = useRef([])
  console.log(inputs.current.value)

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const formRef = useRef()

  const handleForm = async (e) => {
    e.preventDefault()

    try {
      const userData = {
        email: inputs.current[0].value,
        password: inputs.current[1].value,
      }
      const logIn = await Axios.post('/auth/signin/', userData)
      window.location = '/home'
    } catch (err) {}
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
            <form
              onSubmit={handleForm}
              ref={formRef}
              className="auth__body__form"
            >
              <div className="auth__form__container">
                <div className="auth__body__form__container">
                  <label htmlFor="signUpMail" className="formLabel">
                    User identification
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
