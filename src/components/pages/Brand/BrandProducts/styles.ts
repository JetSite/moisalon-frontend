import styled from 'styled-components'

import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const MoreButtonWrapper = styled(Wrapper)`
  margin-top: 24px;
  margin-bottom: 64px;
`
