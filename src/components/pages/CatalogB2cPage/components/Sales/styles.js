import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  padding: 0 140px;
  margin: 0 auto;
  margin-bottom: 60px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-bottom: 30px;
  }
`

export const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 27px;
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;

  @media (max-width: ${laptopBreakpoint}) {
    gap: 10px;
  }
`

export const WrapButton = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  width: 270px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 30px;
  }
`
