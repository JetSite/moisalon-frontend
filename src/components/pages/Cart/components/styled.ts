import Link from 'next/link'
import { laptopBreakpoint, mobileBreakpoint, red } from 'src/styles/variables'
import styled, { css } from 'styled-components'

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

export const OrderLink = styled(Link)<{ disabled?: boolean }>`
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`

export const Wrapper = styled.div`
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 20px;
  margin-bottom: 45px;
`

export const Top = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const ImagePlaceholder = styled.div`
  border: 1px solid #ededed;
  border-radius: 5px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  margin-right: 28px;
  flex-shrink: 0;
  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`

export const Name = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 7px;
`

export const Description = styled.div`
  font-size: 10px;
  line-height: 16px;
  margin-bottom: 7px;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Price = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #f03;
`

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

export const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mobileBreakpoint}) {
    margin: 0 auto;
    margin-left: 86px;
  }
`

export const Quantity = styled.p<{ isWrongQuantity?: boolean }>`
  font-size: 10px;
  line-height: 16px;
  width: 60px;
  text-align: center;
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};

  @media (max-width: ${laptopBreakpoint}) {
    width: 40px;
  }
`

export const AvailableQuantity = styled.p<{ isWrongQuantity?: boolean }>`
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};
  font-size: 12px;
  line-height: 16px;

  @media (max-width: ${mobileBreakpoint}) {
    margin: 7px 0 2px 0;
  }
`

export const PriceQuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`
