import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.section`
  padding: 0 140px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-top: 0px;
    padding: 0 20px;
  }
`
