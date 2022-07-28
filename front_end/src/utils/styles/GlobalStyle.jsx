import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
  *, ::before, ::after{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Lato, sans-serif;
  color:  ${colors.tertiary};   
}
`

export default function GlobalStyle() {
  return <StyledGlobalStyle />
}
