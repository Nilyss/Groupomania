// styles
import colors from '../../utils/styles/colors'
import '../../utils/styles/home.css'

// img
import logo from '../../assets/icon-left-font-monochrome-black.png'
import Background from '../../assets/officepicture.webp'

// dependencies
import styled from 'styled-components'

// components
import { Button } from '../../components/button'

// Hook
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.title = 'Groupomania - connexion'
  }, [])

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

  const FormWrapper = styled.form`
    width: 30%;
    height: 40vh;
    border-radius: 1rem;
    border: 2px solid ${colors.tertiary};
    background: ${colors.secondary};
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    cursor: pointer;
    &:hover {
      outline: 0;
    }
    &:after {
      content: '';
      background-color: ${colors.tertiary};
      border-radius: 8px;
      display: block;
      height: 40vh;
      left: 0;
      width: 100%;
      position: absolute;
      transform: translate(1rem, 1rem);
      transition: transform 200ms ease-out;
      z-index: -1;
    }
    &:hover:after {
      transform: translate(0, 0);
    }
    &:active:after {
      background-color: #ffdeda;
      outline: 0;
    }
  `

  const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 2rem;
    width: 30%;
    justify-content: center;
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

  const LabelInput = styled.label`
    text-align: center;
    width: 80%;
    color: ${colors.tertiary};
  `

  const LogInInput = styled.input`
    width: 100%;
    height: 3vh;
    margin-top: 2rem;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 1.1rem;
    color: ${colors.primary};
  `

  return (
    <HomeBackground>
      <HomeWrapper>
        <NavButton>
          <Button>Sign up</Button>
        </NavButton>
        <Logo src={logo}></Logo>
        <FormWrapper>
          <LabelInput>
            User identification :
            <LogInInput type="email" name="name" />
          </LabelInput>
          <LabelInput>
            Password :
            <LogInInput type="password" name="name" />
          </LabelInput>
        </FormWrapper>
        <ButtonWrapper>
          <Button>Log in</Button>
        </ButtonWrapper>
      </HomeWrapper>
    </HomeBackground>
  )
}
