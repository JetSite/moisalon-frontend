import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Content = styled.div`
  margin-top: 40px;
  margin-bottom: 162px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 100px;
  }
`

export const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 60px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    margin-bottom: 40px;
    text-align: center;
  }
`

export const Desc = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    margin-bottom: 25px;
  }
`

export const ContentForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

export const Left = styled.div`
  width: 100%;
  max-width: 474px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 60px;
    max-width: 100%;
  }
`

export const Right = styled.div`
  width: 100%;
  max-width: 569px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
    max-width: 100%;
  }
`

export const FieldWrap = styled.div`
  width: 100%;
  margin-bottom: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 25px;
  }
`

export const ShipingWrap = styled.div`
  display: flex;
  margin-bottom: 50px;
`

export const RadioWrap = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: wrap;
  }
`

export const ShipingItem = styled.div`
  width: 173px;
  border: ${props => (props.active ? '1px solid #f03' : '1px solid #000000')};
  border-radius: 50px;
  background: ${props => (props.active ? '#f03' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#000')};
  font-weight: 500;
  font-size: 14px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 15px;
  }
`

export const RadioItem = styled(ShipingItem)`
  width: 217px;
`

export const TextAreaWrap = styled.div`
  width: 100%;
  max-width: 472px;
  margin-bottom: 53px;
`

export const SuccessWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

export const SuccessRight = styled.div`
  max-width: 453px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const SuccessLeft = styled.div`
  max-width: 453px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const Text = styled.p`
  font-size: 18px;
  line-height: 30px;
  word-break: break-all;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 25px;
  }
`

export const ContentWrap = styled.div`
  margin-bottom: 40px;
`

export const ItemChecked = styled.div`
  padding-bottom: 37px;
  margin-bottom: 37px;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
`

export const Image = styled.div`
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

export const ItemCheckedRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`

export const Name = styled.p`
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 18px;
  }
`

export const Price = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff0033;
  font-weight: 600;
`

export const Quantity = styled.p`
  font-size: 10px;
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 78px;
`
export const TextSumm = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
`
export const TextTotal = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`

export const ButtonWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 100%;
      padding: 0;
    }
  }
`

export const BrandsAddresses = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const BrandsAddressWrap = styled.div`
  margin-bottom: 20px;
  @media (max-width: ${laptopBreakpoint}) {
  }
`
