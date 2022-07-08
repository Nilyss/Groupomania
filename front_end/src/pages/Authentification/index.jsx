// styles
import colors from '../../utils/styles/colors'
import '../../utils/styles/Authentification.css'

// img
import logo from '../../assets/icon-left-font-monochrome-black.png'
import Background from '../../assets/officepicture.webp'

// dependencies
import styled from 'styled-components'

// components
import { Button } from '../../components/button'

// Hook
import { useState, useEffect } from 'react'

export default function Authentification(props) {
  let [authMode, setAuthMode] = useState('signIn')
  const changeAuthMode = () => {
    setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')
  }

  const HomeBackground = styled.body`
    margin-inline-start: 0;
    padding-inline-start: 0;
    background: url('${Background}') no-repeat fixed;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  `
  const HomeWrapper = styled.section`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    margin: 3rem;
  `
  const Logo = styled.img`
    align-self: flex-end;
    width: 20vw;
    height: 20vh;
    margin: 0 5% 0 0;
    object-fit: cover;
  `
  const NavButton = styled.nav`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `

  const AuthForm = styled.form`
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
    margin: -0.5em 0 1em 0;
    font-size: 24px;
    color: ${colors.tertiary};
    font-weight: 800;
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
    height: 2vh;
    margin-bottom: 1em;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: ${colors.primary};
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
      transform: translate(0.5em, 0.5em);
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

  if (authMode === 'signIn') {
    return (
      <HomeBackground>
        <HomeWrapper>
          <NavButton>
            <Button onClick={changeAuthMode}>Sign-up</Button>
          </NavButton>
          <Logo src={logo}></Logo>
          <AuthForm>
            <AuthTitle>Sign-in</AuthTitle>
            <AuthFormContent>
              <div className="authFormMail">
                <AuthLabel> User identification:</AuthLabel>
                <AuthInput
                  type="email"
                  placeholder="Enter your email address"
                />
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
      </HomeBackground>
    )
  }

  return (
    <HomeBackground>
      <HomeWrapper>
        <NavButton>
          <Button onClick={changeAuthMode}>Sign-In</Button>
        </NavButton>
        <Logo src={logo}></Logo>
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
    </HomeBackground>
  )
}
