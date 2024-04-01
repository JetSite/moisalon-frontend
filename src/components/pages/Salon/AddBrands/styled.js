import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const BrandsContent = styled.div`
  margin-top: 40px;
`

export const Title = styled.h3`
  margin-bottom: 40px;
  font-size: 16px;
  font-weight: 600;
  line-height: 45px;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 572px;
  margin-bottom: 45px;
  gap: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 30px;
    min-width: 100%;
  }
`
