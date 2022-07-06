// dependencies
import styled from 'styled-components'

// styles
import colors from '../utils/styles/colors'

export const Button = styled.button`
  @media (min-width: 768px) {
    padding: 0 40px;
  }
  align-items: center;
  background-color: ${colors.secondary};
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  display: flex;
  font-family: Lato, sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  cursor: pointer;
  &:hover {
    outline: 0;
  }
  &:after {
    content: '';
    background-color: #111;
    border-radius: 8px;
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
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
