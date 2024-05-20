import styled from 'styled-components'

import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 529px;
  position: relative;
  background: url('/404.jpg') no-repeat center;
  background-size: cover;
  padding: 157px 0;
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 2;
    padding: 157px 20px;
    background: url('/mobile-404-bg.png') no-repeat top;
  }
`

export const Title = styled.h2`
  font: inherit;
  position: relative;
  z-index: 3;
`

export const Text = styled.p`
  font: inherit;
  position: relative;
  z-index: 3;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
  }
`
