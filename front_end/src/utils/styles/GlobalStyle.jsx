import { createGlobalStyle } from 'styled-components'
import colors from './colors'

// img

const StyledGlobalStyle = createGlobalStyle`
*{
  font-family: Lato, sans-serif;
  color:  ${colors.tertiary}
}
body {
}
`

export default function GlobalStyle() {
  return <StyledGlobalStyle />
}
