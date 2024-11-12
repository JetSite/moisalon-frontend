import styled from 'styled-components'
import {
  laptopBreakpoint,
  largeLaptopBreakpoint,
} from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  min-height: 674px;
  background-color: #000;
  position: relative;
  padding: 252px 136px 153px 600px;

  &:before {
    position: absolute;
    content: '';
    background: url('/red-halfcircle-down.svg') no-repeat;
    background-size: contain;
    width: 231px;
    height: 231px;
    top: -76px;
    left: 54px;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding-left: 800px;
  }

  &:after {
    position: absolute;
    content: '';
    background: url('/about-arrow-icon.svg') no-repeat;
    background-size: contain;
    width: 206px;
    height: 242px;
    top: 60px;
    left: 39%;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    min-height: auto;
    padding: 36px 20px 39px 20px;
    background: url('/mobile-invite-bg.png');
  }
`

export const ImageWoman = styled.div`
  position: absolute;
  left: 80px;
  bottom: -50px;
  width: 741px;
  height: 627px;
  background: url('/woman-right.png') no-repeat center;

  &:before {
    position: absolute;
    content: '';
    background: url('/mobile-about-asset3.svg') no-repeat center;
    background-size: contain;
    width: 112px;
    height: 130px;
    bottom: 243px;
    left: 0;
  }

  &:after {
    position: absolute;
    content: '';
    background: url('/all-salon-img.svg') no-repeat center;
    background-size: contain;
    width: 109px;
    height: 127px;
    right: 180px;
    bottom: 65px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Content = styled.div`
  padding: 35px 70px;
  background-color: #fff;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  &:after {
    position: absolute;
    content: '';
    background: url('/white-romb.svg') no-repeat center;
    background-size: contain;
    width: 26px;
    height: 26px;
    right: 60px;
    top: 57px;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 45px 18px;
    max-width: none;
    margin: 0;
  }
`

export const ContentWrap = styled.div`
  max-width: 366px;
  margin: 0 auto;
`

export const Title = styled.h4`
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  text-transform: uppercase;
  text-align: center;
`

export const Text = styled.p`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;
`

export const ButtonWrapper = styled.div`
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ButtonWrapperMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    min-width: 280px;
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
