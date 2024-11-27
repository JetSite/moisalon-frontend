import styled from 'styled-components'

import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  opacity: 0.5;
  filter: grayscale(1);

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 100px;
    padding: 0 20px;
    background: #fff;
  }
`
