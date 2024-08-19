import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
    padding-top: 0;
  }
`

export const Wrap = styled.div`
  margin-top: 40px;
`

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
`

export const Total = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #a2a2a2;
`

export const TitlePage = styled.h2`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 40px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: none;
  }
`

export const Empty = styled.p`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 140px;
  font-size: 18px;
  line-height: 30px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 40px 20px;
  }
`
