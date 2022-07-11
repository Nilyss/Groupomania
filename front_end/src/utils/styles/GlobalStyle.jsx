import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
*{
  font-family: Lato, sans-serif;
  color:  ${colors.tertiary}; 
}

body {
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}
`

export default function GlobalStyle() {
  return <StyledGlobalStyle />
}
