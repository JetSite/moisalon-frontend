import styled from 'styled-components'
import { mobileBreakpoint, red } from '../../../styles/variables'
import Button from '../Button'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: 0.3s;

  &.fadeBg-enter {
    opacity: 0;
  }

  &.fadeBg-enter-active {
    opacity: 1;
  }

  &.fadeBg-exit {
    opacity: 1;
  }

  &.fadeBg-exit-active {
    opacity: 0;
  }

  @media (max-width: ${mobileBreakpoint}) {
    padding: 20px;
  }
`

export const PopupWrapper = styled.div`
  width: 630px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 10000;
  position: relative;
  overflow: hidden;
  transition: 0.4s;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    max-width: 400px;
    height: 90vh;
    max-height: 600px;
    overflow-y: scroll;
  }
`

export const Left = styled.div`
  width: 45%;
  height: 100%;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    height: 30%;
  }
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Right = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    align-items: flex-start;
  }
`

export const PopupContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`

export const Title = styled.h2`
  margin-top: 40px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #000;

  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 0;
    font-size: 12px;
    line-height: 18px;
  }
`

export const MinimalOrder = styled.p`
  margin-top: 5px;
  font-size: 10px;
  line-height: 14px;
  color: ${red};

  @media (max-width: ${mobileBreakpoint}) {
  }
`

export const QuantityWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`

export const QuantityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 66.3%;
  max-width: 116px;
  margin-left: 15px;
`

export const Description = styled.p`
  font-size: 14px;
  font-weight: 500;

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 12px;
    line-height: 18px;
  }
`

export const PopupInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 2px solid #f0f0f0;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-bottom: 2px solid #959595;
  }
`

export const ButtonPopup = styled(Button)`
  width: 100%;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    font-size: 16px;
  }
`

export const Minus = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: #f0f0f0 url('/icon-minus.svg') no-repeat center;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: gray url('/icon-minus.svg') no-repeat center;

    &:hover {
      background: gray url('/icon-minus.svg') no-repeat center;
    }
  }

  &:hover {
    background: #ff0033 url('/icon-minus-white.svg') no-repeat center;
  }
`

export const Plus = styled(Minus)`
  background: #f0f0f0 url('/icon-plus.svg') no-repeat center;
  background-size: 13px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: gray url('/icon-plus.svg') no-repeat center;
    background-size: 13px;

    &:hover {
      background: gray url('/icon-plus.svg') no-repeat center;
      background-size: 13px;
    }
  }

  &:hover {
    background: #ff0033 url('/icon-plus-white.svg') no-repeat center;
    background-size: 13px;
  }
`

export const Quantity = styled.p`
  font-size: 10px;
  line-height: 16px;
`

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: url('/close-cross.svg') no-repeat center;
`

export const Success = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`

export const Error = styled.div`
  min-height: 14px;
  margin: 8px 0;
  font-size: 10px;
  line-height: 14px;
  color: ${red};
`

export const TitleWrap = styled.div`
  margin-bottom: 10px;
`

export const ProductDescription = styled(Description)`
  margin-top: 5px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  max-height: 80px;
  overflow-y: auto;

  @media (max-width: ${mobileBreakpoint}) {
    margin-top: 0;
    font-size: 12px;
    line-height: 18px;
    max-height: 200px;
  }
`

export const PriceWrap = styled.div`
  display: flex;
  align-self: flex-start;
`

export const Price = styled.p<{ lessMinPrice?: boolean }>`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ lessMinPrice }) => (lessMinPrice ? red : '#000')};

  @media (max-width: ${mobileBreakpoint}) {
  }
`

export const PhoneInputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: flex-start;
`

export const PhoneCode = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: fit-content; */
  margin-right: 5px;
`
