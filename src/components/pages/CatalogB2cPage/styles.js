import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  padding: 0 140px;
  margin: 0 auto;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    padding-bottom: 20px;
    column-gap: 20px;
    margin-top: 15px;
    margin-bottom: 10px;
    overflow-x: auto;
  }
`

export const Category = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    flex-shrink: 0;
  }
`

export const WrapButton = styled.div`
  padding: 36px 0;
  text-align: center;
`
