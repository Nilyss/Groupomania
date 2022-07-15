// Hook
import { useState } from 'react'

export default function AuthForm() {
  const [isLogIn, setIsLogin] = useState(true)
  const toggleIsLogin = () => {
    setIsLogin((current) => !current)
  }

  const SignInForm = () => {
    return (
      <section className="auth">
        <nav className="auth__nav">
          <button className="auth__nav__btn" onClick={toggleIsLogin}>
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
          <button className="auth__nav__btn" onClick={toggleIsLogin}>
            Sign-in
          </button>
        </nav>
        <form className="auth__form">
          <h3 className="auth__form__title">Sign-up</h3>
          <div className="auth__form__body">
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                First Name:{' '}
              </label>
              <input
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
            <div className="auth__form__body__inputWrapper">
              <label className="auth__form__body__inputWrapper__label">
                Password:{' '}
              </label>
              <input
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

  return <div>{isLogIn ? <SignInForm /> : <SignUpForm />}</div>
}
