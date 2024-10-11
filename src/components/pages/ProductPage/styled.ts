import styled from 'styled-components'
import {
  laptopBreakpoint,
  mobileBreakpoint,
  red,
} from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-bottom: 118px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 21px;
    margin-bottom: 0;
  }
`

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    padding-top: 0;
  }
`

export const Left = styled.div`
  width: 334px;
  margin-right: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const ImageBrand = styled.div`
  width: 334px;
  height: 336px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 37px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 334px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`

export const Image = styled.img`
  max-height: 100%;
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Right = styled.div`
  max-width: 710px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin: 23px auto 0 auto;
  }
`

export const Title = styled.h1`
  max-width: 614px;
  font-weight: 500;
  font-size: 36px;
  line-height: 1.5;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 25px;
  }
`

export const Price = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #f03;
  @media (max-width: ${laptopBreakpoint}) {
    text-align: center;
  }
`
export const OldPrice = styled.p`
  margin-top: 35px;
  color: #a1a1a1;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  position: relative;
  display: block;
  width: min-content;
  white-space: nowrap;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    margin-top: 25px;
  }

  &:after {
    content: '';
    position: absolute;
    background: #a1a1a1;
    height: 1px;
    width: 100%;
    top: 7px;
    left: 0;
  }
`

export const WrapButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
`

export const CustomButton = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  position: relative;
  color: #000;
  border: 0.5px solid #000000;
  width: 335px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: 0.3s;

  &:hover {
    background: ${red};
    border-color: ${red};
    color: #fff;
  }
`

export const TopCustomButton = styled.p`
  font-weight: 600;
  font-size: 18px;
`

export const BottomCustomButton = styled.p`
  font-size: 14px;
`

export const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 33px;
`

export const Minus = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  flex-shrink: 0;
  cursor: pointer;
  background: #f0f0f0 url('/icon-minus.svg') no-repeat center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff0033 url('/icon-minus-white.svg') no-repeat center;
  }
`

export const Plus = styled(Minus)<{ disabled: boolean }>`
  background: #f0f0f0 url('/icon-plus.svg') no-repeat center;
  background-size: 13px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background: #ff0033 url('/icon-plus-white.svg') no-repeat center;
    background-size: 13px;
  }
`

export const Quantity = styled.p<{ isWrongQuantity: boolean }>`
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};
  font-size: 10px;
  line-height: 16px;
  width: 60px;
  text-align: center;
  @media (max-width: ${laptopBreakpoint}) {
    width: 40px;
  }
`

export const Description = styled.div`
  font-size: 18px;
  line-height: 30px;
  margin-top: 84px;
  margin-bottom: 43px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 25px;
    margin-top: 36px;
  }
`

export const Character = styled.p`
  text-decoration: underline;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #f03;
  }
  @media (max-width: ${laptopBreakpoint}) {
    text-decoration: none;
    font-size: 16px;
    position: relative;
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 10px;
    &:before {
      width: 10px;
      height: 10px;
      position: absolute;
      content: '';
      background: url('/arrow-back.svg') no-repeat;
      background-size: contain;
      transform: rotate(180deg);
      right: 0;
    }
  }
`

export const OpenCharacter = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #f03;
  }
  @media (max-width: ${laptopBreakpoint}) {
    text-decoration: none;
    font-size: 16px;
    position: relative;
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 10px;
    &:before {
      width: 10px;
      height: 10px;
      position: absolute;
      content: '';
      background: url('/arrow-back.svg') no-repeat;
      background-size: contain;
      transform: rotate(270deg);
      right: 0;
    }
  }
`

export const Attributes = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  margin-bottom: 15px;
`

export const Name = styled.div`
  width: 40%;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`

export const Value = styled.div`
  width: 40%;
  font-size: 14px;
  line-height: 20px;
`

export const WrapCharacter = styled.div`
  margin-bottom: 20px;
`

export const Terms = styled.p`
  font-size: 18px;
  line-height: 30px;
  max-width: 560px;
  width: 100%;
`

export const AvailableQuantity = styled.p<{ isWrongQuantity: boolean }>`
  color: ${({ isWrongQuantity }) => (isWrongQuantity ? red : '#000')};
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-top: 35px;

  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 25px;
    text-align: center;
  }
`

export const ButtonsWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    flex-direction: column;
  }
`

export const Detail = styled.div`
  margin-top: 15px;
  font-size: 18px;

  @media (max-width: ${mobileBreakpoint}) {
  }
`
