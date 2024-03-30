import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding: 0 20px;
  }
`

export const TitleWrap = styled.div`
  display: flex;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;
  padding-bottom: 40px;
  border-bottom: 0.5px solid #a2a2a2;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 24px;
    padding-bottom: 6px;
  }
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Count = styled.p`
  color: #cdcdcd;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const NoServicesText = styled.p`
  margin-bottom: 60px;
`
