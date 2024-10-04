import styled, { keyframes, createGlobalStyle } from 'styled-components'

// Анимация вращения
const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

// Спиннер
export const Spinner = styled.div<{ background: boolean }>`
  ${({ background }) => {
    return background
      ? `
  display: flex; 
  justify-content: center;
  align-items: center; 
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 501;
  `
      : `
      display: flex; 
  `
  }}

  &:after {
    content: ' ';
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 5px solid #000;
    border-color: #797979 transparent #797979 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`

// Фон для спиннера
export const Background = styled.div`
  position: fixed;
  z-index: 500;
  background-color: black;
  opacity: 0.3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

// Глобальный стиль для блокировки прокрутки
export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden !important;
  }
`
