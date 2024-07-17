import styled, { keyframes } from 'styled-components'
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'

const move = lengthValue => keyframes`
  100% { 
    transform: translateX(-${lengthValue}px);  
  }
`

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 19px 17px;
  background: ${({ bg }) => `${bg}`};
  color: ${({ border }) => `${border}`};
  white-space: nowrap;
  border-top: 1px solid ${({ border }) => `${border}`};
  border-bottom: 1px solid ${({ border }) => `${border}`};
  position: relative;
  overflow: hidden;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 34px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const TextWrapper = styled.div`
  height: 100%;
  width: 100000px;
  position: absolute;
  overflow-x: hidden;
  top: 15px;
  left: 0;

  animation: ${({ length }) => move(length)} 9s linear infinite;

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Text = styled.p`
  width: ${({ length }) => `${length}px`};
  display: inline-block;
  font-size: 40px;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`
