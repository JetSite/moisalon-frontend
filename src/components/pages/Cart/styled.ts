import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import Link from 'next/link'

export const Wrapper = styled.div`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding: 0 140px;
  margin: 0 auto;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    width: 100%;
  }
`

export const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 50px;
  margin-left: 5px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 20px;
  }
`

export const ProductsWrap = styled.div`
  max-width: 453px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const CheckAndDelete = styled.div`
  display: flex;
  margin-bottom: 45px;
  align-items: center;
`

export const Delete = styled.p`
  font-size: 10px;
  color: #f03;
  cursor: pointer;
`

export const Content = styled.div``

export const NoItemsText = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`
export const NoItemsTextRed = styled(Link)`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #f03;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 200px;
`

export const Wrap = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`
