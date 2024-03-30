import styled from 'styled-components'

import { laptopBreakpoint } from './variables'

export const NavigationWrapper = styled.div`
  display: flex;
  max-width: 100px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const SliderWpapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ButtonPrev = styled.button`
  background: ${props =>
    props.color === 'white'
      ? `url("/arrow-prev-white.svg") no-repeat center`
      : `url("/arrow-prev.svg") no-repeat center`};
  height: 7px;
  width: 30px;
  padding: 20px 0;
  background-size: contain;
  outline: none;
  border: none;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ButtonNext = styled.button`
  background: ${props =>
    props.color === 'white'
      ? `url("/arrow-next-white.svg") no-repeat center`
      : `url("/arrow-next.svg") no-repeat center`};
  height: 7px;
  width: 30px;
  padding: 20px 0;
  background-size: contain;
  outline: none;
  border: none;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Bottom = styled.div`
  a {
    display: flex;
    align-items: center;
    margin-top: 48px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`
