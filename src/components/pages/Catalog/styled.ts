import styled from 'styled-components'
import {
  laptopBreakpoint,
  tabletBreakpoint,
  mobileBreakpoint,
} from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin: 0 auto;
  margin-top: 48px;
  max-width: 1440px;
  width: 100%;
  padding-bottom: 80px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
    padding-bottom: 20px;
    margin-top: 0;
  }
`

export const Title = styled.h2<{ noTitle?: boolean }>`
  display: ${({ noTitle }) => (noTitle ? 'none' : 'block')};
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`

export const Content = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  column-gap: 14px;
  row-gap: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    column-gap: 14px;
    row-gap: 20px;
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`

export const ButtonWrap = styled.div`
  text-align: center;
`
