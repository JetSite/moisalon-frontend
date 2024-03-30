import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 60px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-top: 0;
  }
`

export const FiltersWrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 270px;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const ProductsWrap = styled.div`
  max-width: 761px;
  width: 100%;
`

export const Title = styled.p`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 26px;
  }
`

export const Change = styled.p`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
  }
`

export const ChangeTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-shrink: 0;
  }
`

export const Item = styled.p`
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${laptopBreakpoint}) {
    flex-shrink: 0;
  }
`

export const Text = styled.p`
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
`

export const GoodsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;
  margin-top: 30px;
`

export const WrapButton = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  width: 270px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 30px;
  }
`
