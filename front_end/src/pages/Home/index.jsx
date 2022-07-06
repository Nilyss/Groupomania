// img
import logo from '../../assets/icon-left-font.png'

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

  const HomeWrapper = styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  `

  const Logo = styled.img`
    width: 50%;
    height: 50%;
  `
  const NavButton = styled.nav`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `

  return (
    <div>
      <HomeWrapper>
        <NavButton>
          <Button>Sign up</Button>
        </NavButton>
        <Logo src={logo}></Logo>
        <Button>Log in</Button>
      </HomeWrapper>
    </div>
  )
}
