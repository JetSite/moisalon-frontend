import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { red, laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    text-transform: none;
  }
`

export const OrdersList = styled.div`
  margin-top: 64px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 15px;
  }
`

export const OrderWrapper = styled.div`
  padding: 37px 0 46px 45px;
  background: #f8f8f8;
  border-radius: 5px;

  &:not(:last-child) {
    margin-bottom: 11px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 25px;
  }
`

export const OrderTop = styled.div`
  display: flex;
  margin-bottom: 35px;
  font-size: 18px;
  font-weight: 600;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    &:before {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -7px;
      left: 0;
      background: #e3e3e3;
    }
  }
`

export const TopDate = styled.p`
  width: 50%;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
  }
`

export const TopOrderNum = styled.p`
  width: 50%;
  color: ${red};
  @media (max-width: ${laptopBreakpoint}) {
    text-align: right;
  }
`

export const OrderDetail = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;

  &:not(:first-child) {
    margin-top: 17px;
  }
`

export const OrderDetailMobileWrap = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    width: 100%;
    font-size: 14px;
    font-weight: 400;

    &:not(:first-child) {
      margin-top: 17px;
    }
  }
`

export const OrderDetailMobile = styled(OrderDetail)`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
  }
`

export const DetailName = styled.p`
  width: 50%;
`

export const DetailValue = styled.p`
  width: 50%;
  display: flex;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const DetailsWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Details = styled(DetailValue)`
  width: 100%;
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 17px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const DetailsLeft = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const DetailsLeftAddress = styled(DetailsLeft)`
  width: 100%;
`

export const BrandName = styled.p`
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const BrandPhone = styled.p`
  margin-top: 5px;
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const BrandAddress = styled.p`
  margin-top: 5px;
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const DetailsRight = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const OrderBottom = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 36px;

  @media (max-width: ${laptopBreakpoint}) {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0;
  }
`

export const BottomButton = styled.div`
  width: 50%;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const BottomButtonMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
    margin-top: 30px;
  }
`

export const ButtonStyled = styled(Button)`
  background: transparent;
`

export const BottomProducts = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const BottomProductsMobile = styled(BottomProducts)`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 10px;
  }
`

export const ProductWrapper = styled.div`
  width: 88px;
  height: 90px;
  margin-top: 12px;
  background: #fff ${({ link }) => `url(${link})`} no-repeat center;
  background-size: contain;
  border-radius: 5px;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 12px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 68px;
    height: 80px;
    background-size: contain;
  }
`

export const SocialsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 124px;
    margin-top: 10px;
  }
`

export const NoOrders = styled.div`
  margin-top: 40px;
  font-size: 22px;
  font-weight: 400;
`

export const HiddenMobileOrderDetail = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;

  &:not(:first-child) {
    margin-top: 17px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const OrderIcon = styled.div`
  width: 12px;
  height: 12px;
  margin-left: auto;
  background: url('/filter-arrow.png') no-repeat center;
  background-size: cover;
  transform: ${({ opened }) => (opened ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: all 0.2s ease-in-out;
`

export const ButtonMobileWrap = styled.div``
