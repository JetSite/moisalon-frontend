import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const NoProducts = styled.div`
  margin: 110px 0;
  font-size: 18px;
  line-height: 30px;
`

export const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 23px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    margin-bottom: 0;
    text-transform: uppercase;
    text-align: center;
  }
`
