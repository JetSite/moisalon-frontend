import styled from 'styled-components'
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 179px 140px 163px 140px;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
    padding: 0 20px;
    padding-bottom: 60px;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:first-child) {
    margin-top: 163px;
  }

  @media (max-width: ${tabletBreakpoint}) {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column-reverse;
  }
`

export const List = styled.ul`
  margin-top: 62px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 32px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 32px;
  }
`

export const ListItem = styled.li`
  margin-left: 49px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 29.5px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -49px;
    width: 20px;
    height: 20px;
    background: #000;
    transform: rotate(45deg);

    @media (max-width: ${tabletBreakpoint}) {
      width: 18px;
      height: 18px;
      top: 4px;
      left: -30px;
    }

    @media (max-width: ${laptopBreakpoint}) {
    }
  }

  @media (max-width: ${tabletBreakpoint}) {
    margin-left: 30px;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`
