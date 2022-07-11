// styles
import colors from '../../utils/styles/colors'
import '../../utils/styles/Authentication.css'

// img
import logo from '../../assets/icon-left-font-monochrome-black.png'
import Background from '../../assets/officepicture.webp'

// dependencies
import styled from 'styled-components'

// components
import { Button } from '../../components/button'

// Hook
import { useState } from 'react'

export default function Authentification(props) {
  const [isLogIn, setIsLogin] = useState(true)
  const toggleIsLogin = () => {
    setIsLogin((current) => !current)
  }

  const HomeBackground = styled.body`
    background: url('${Background}') no-repeat fixed center;
    background-size: cover;
    position: absolute;
    z-index: 0;
    min-height: 100%;
    height: border-box;
  `
  const HomeWrapper = styled.section`
    @media (max-width: 768px) {
      display: flex;
      flex-flow: column;
      align-items: center;
      overflow: hidden;
    }
    margin: 3rem;
  `
  const Logo = styled.img`
    @media (max-width: 768px) {
      width: 200px;
      display: flex;
      position: unset;
      margin: auto;
      margin-bottom: -5em;
    }
    position: absolute;
    left: 3em;
    width: 300px;
    margin: -5% 0 0 0;
    object-fit: cover;
  `
  const NavButton = styled.nav`
    @media (max-width: 768px) {
      justify-content: center;
      margin-bottom: 2em;
    }
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 10%;
    margin-bottom: 10rem;
  `

  const AuthForm = styled.form`
    @media (max-width: 768px) {
      width: 220px;
    }
    width: 320px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 8px;
    border: 2px solid ${colors.tertiary};
    background-color: ${colors.secondary};
    box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  `
  const AuthTitle = styled.h3`
    text-align: center;
    margin: -0.5em 0 2em 0;
    font-size: 24px;
    color: ${colors.tertiary};
    font-weight: 800;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 130%;
      left: 20%;
      width: 60%;
      height: 3px;
      background: ${colors.primary};

  `

  const AuthFormContent = styled.div`
    padding: 0 12% 0 12%;
  `

  const AuthLabel = styled.label`
    display: flex;
    flex-flow: column wrap;
    margin-bottom: 1em;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.tertiary};
  `

  const AuthInput = styled.input`
    width: 75%;
    height: 3vh;
    margin-bottom: 1em;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: ${colors.tertiary};
  `
  const AuthFormWrapper = styled.div`
    margin-top: 2em;
    display: flex;
    flex-flow: column;
    width: 75%;
    position: relative;
    z-index: 1;

    &:hover {
      outline: 0;
    }

    &:after {
      content: '';
      background-color: ${colors.tertiary};
      border-radius: 8px;
      display: block;
      width: 78%;
      height: 30px;
      top: -8px;
      left: 15px;
      position: absolute;
      transform: translate(1em, 1em);
      transition: transform 200ms ease-out;
      z-index: -1;
    }

    &:hover:after {
      transform: translate(0.6em, 0.5em);
    }

    &:active:after {
      background-color: #ffdeda;
      outline: 0;
    }
  `

  const AuthFormButton = styled.button`
    align-self: center;
    width: 80%;
    height: 30px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    border: 2px solid ${colors.tertiary};
    background: ${colors.secondary};
    cursor: pointer;
  `

  const ForgotPassword = styled.p`
    padding-top: 2rem;
  `

  const SignUpForm = () => {
    return (
      <HomeWrapper>
        <NavButton>
          <Button onClick={toggleIsLogin}>Sign-in</Button>
        </NavButton>
        <AuthForm>
          <AuthTitle>Sign-up</AuthTitle>
          <AuthFormContent>
            <div className="authFormMail">
              <AuthLabel> User identification:</AuthLabel>
              <AuthInput type="email" placeholder="Enter your email address" />
            </div>
            <div className="authFormPassword">
              <AuthLabel>Password: </AuthLabel>
              <AuthInput type="password" placeholder="Enter your password" />
            </div>
            <div className="authFormPassword">
              <AuthLabel>Confirm password: </AuthLabel>
              <AuthInput
                type="password"
                placeholder="Enter your password again"
              />
            </div>
            <AuthFormWrapper className="authFormButton">
              <AuthFormButton type="submit" className="submitButton">
                Register
              </AuthFormButton>
            </AuthFormWrapper>
          </AuthFormContent>
        </AuthForm>
      </HomeWrapper>
    )
  }

  const SignInForm = () => {
    return (
      <HomeWrapper>
        <NavButton>
          <Button onClick={toggleIsLogin}>Sign-up</Button>
        </NavButton>
        <AuthForm>
          <AuthTitle>Sign-in</AuthTitle>
          <AuthFormContent>
            <div className="authFormMail">
              <AuthLabel> User identification:</AuthLabel>
              <AuthInput type="email" placeholder="Enter your email address" />
            </div>
            <div className="authFormPassword">
              <AuthLabel>Password: </AuthLabel>
              <AuthInput type="password" placeholder="Enter your password" />
            </div>
            <AuthFormWrapper className="authFormButton">
              <AuthFormButton type="submit" className="submitButton">
                Enter
              </AuthFormButton>
            </AuthFormWrapper>
            <ForgotPassword>
              Forgot <a href="#">password</a> ?
            </ForgotPassword>
          </AuthFormContent>
        </AuthForm>
      </HomeWrapper>
    )
  }

  return (
    <HomeBackground>
      <Logo src={logo} alt="logo groupomania"></Logo>
      {isLogIn ? <SignInForm /> : <SignUpForm />}
    </HomeBackground>
  )
}
