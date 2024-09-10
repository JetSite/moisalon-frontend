import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; // Заставляем Wrapper заполнять оставшееся пространство в main
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

export const CheckAll = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-left: -9px;
  margin-right: 25px;
`

export const CheckAndDelete = styled.div`
  display: flex;
  margin-bottom: 45px;
  align-items: center;
`

export const TextAll = styled.p`
  font-size: 10px;
`

export const Delete = styled.p`
  font-size: 10px;
  color: #f03;
  cursor: pointer;
`

export const Content = styled.div``

export const OrderWrap = styled.div`
  width: 335px;
  margin-left: 140px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    margin-bottom: 55px;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 78px;
`

export const TotalBrand = styled.div`
  display: flex;
  justify-content: space-between;
  color: #f03;
  margin-bottom: 20px;
`

export const TextBrandTotal = styled.div`
  flex-shrink: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`

export const TextSumm = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

export const TextBrandSumm = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  max-width: 70%;
  margin-right: 20px;
`

export const TextTotal = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`

export const NoItemsText = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`
export const NoItemsTextRed = styled.p`
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
