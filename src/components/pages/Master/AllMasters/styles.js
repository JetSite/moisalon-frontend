import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  box-sizing: border-box;
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
`

export const CategoryImage = styled.div`
  min-height: 381px;
  background: url('/masters-page-bg.jpg') no-repeat;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const WrapBanner = styled.div`
  &.banner-enter {
    opacity: 0;
  }
  &.banner-enter-active {
    opacity: 1;
    transition: opacity 500ms, transform 500ms;
  }
  &.banner-exit {
    opacity: 1;
  }
  &.banner-exit-active {
    opacity: 0;
    transition: opacity 500ms, transform 500ms;
  }
`
