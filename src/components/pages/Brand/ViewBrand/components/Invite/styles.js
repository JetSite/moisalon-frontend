import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  min-height: 782px;
  background-color: #000;
  position: relative;
  padding: 252px 136px 153px 800px;

  &:before {
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

export const ImageRihgt = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 741px;
  height: 627px;
  background: url('/masters-page-right.png') no-repeat center;

  &:before {
    position: absolute;
    content: '';
    background: url('/white-romb.svg') no-repeat center;
    background-size: contain;
    width: 48px;
    height: 48px;
    top: 10px;
    left: 87px;
  }

  &:after {
    position: absolute;
    content: '';
    background: url('/red-halfcircle.svg') no-repeat center;
    background-size: contain;
    width: 341px;
    height: 341px;
    right: 30px;
    bottom: -112px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Content = styled.div`
  padding: 35px 70px;
  background-color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 30px 28px;
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

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Text = styled.p`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const ButtonWrapper = styled.div`
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
