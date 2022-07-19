// import Axios for http request
import axios from 'axios'

// Hook
import { useState } from 'react'

export default function AuthForm() {
  const [dataArr, setDataArr] = useState([])
  const [stateInput, setStateInput] = useState('')
  const linkedInput = (e) => {
    setStateInput(e)
  }

  const addToForm = (e) => {
    e.preventDefault()
    const newArr = [...dataArr]
    const newUser = {}
    newUser.firstName = stateInput
    newUser.lastName = stateInput
    newUser.mail = stateInput
    newUser.password = stateInput
    newUser.isAdmin = 0
    newArr.push(newUser)
    setStateInput('')
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [isLogIn, setIsLogin] = useState(true)
  const toggleIsLogin = () => {
    setIsLogin((current) => !current)
  }

  const SignInForm = () => {
    return (
      <section className="auth">
        <nav className="auth__nav">
          <button
            className="auth__nav__btn submitButton"
            onClick={toggleIsLogin}
          >
            Sign-up
          </button>
        </nav>
        <form className="auth__form">
          <h3 className="auth__form__title">Sign-in</h3>
          <div className="auth__form__body">
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                User identification:{' '}
              </label>
              <input
                className="auth__form__body__inputWrapper__input"
                type="email"
                placeholder="electricsheep1968@nexus.com"
              ></input>
            </div>
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                Password:{' '}
              </label>
              <input
                className="auth__form__body__inputWrapper__input"
                type="password"
                placeholder="Enter your password"
              ></input>
            </div>
            <div className="auth__form__body__submitWrapper">
              <button
                className="auth__form__body__submitWrapper__btn"
                type="submit"
              >
                Enter
              </button>
            </div>
            <p className="auth__form__body__forgotPassword">
              Forgot <a href="#">password</a> ?
            </p>
          </div>
        </form>
      </section>
    )
  }

  const SignUpForm = () => {
    return (
      <section className="auth">
        <nav className="auth__nav">
          <button
            className="auth__nav__btn submitButton"
            onClick={toggleIsLogin}
          >
            Sign-in
          </button>
        </nav>
        <form onSubmit={addToForm} className="auth__form">
          <h3 className="auth__form__title">Sign-up</h3>
          <div className="auth__form__body">
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                First Name:{' '}
              </label>
              <input
                autoFocus="autoFocus"
                value={stateInput}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="auth__form__body__inputWrapper__input"
                type="text"
                placeholder="Rick"
              ></input>
            </div>
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                Last Name:{' '}
              </label>
              <input
                value={stateInput}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="auth__form__body__inputWrapper__input"
                type="text"
                placeholder="DECKARD"
              ></input>
            </div>
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                eMail:{' '}
              </label>
              <input
                value={stateInput}
                onChange={(e) => setMail(e.target.value)}
                required
                className="auth__form__body__inputWrapper__input"
                type="email"
                placeholder="electricsheep1968@nexus.com"
              ></input>
            </div>
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                Password:{' '}
              </label>
              <input
                value={stateInput}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth__form__body__inputWrapper__input"
                type="password"
                placeholder="Enter your password"
              ></input>
            </div>
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                Password:{' '}
              </label>
              <input
                value={stateInput}
                onChange={(e) => setMatchPassword(e.target.value)}
                className="auth__form__body__inputWrapper__input"
                type="password"
                placeholder="Confirm your password"
              ></input>
            </div>
            <div className="auth__form__body__submitWrapper">
              <button
                className="auth__form__body__submitWrapper__btn"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  }

  function getUserAccount() {
    return axios.post('/api/auth/signup', {
      firstName: { firstName },
      lastName: { lastName },
      email: { mail },
      password: { password },
      isAdmin: 0,
    })
  }

  return <div>{isLogIn ? <SignInForm /> : <SignUpForm />}</div>
}
