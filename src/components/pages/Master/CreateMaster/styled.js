import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    flex-direction: column;
    align-items: center;
  }
`
