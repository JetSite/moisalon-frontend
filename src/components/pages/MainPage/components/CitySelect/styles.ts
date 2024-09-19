import styled from 'styled-components'
import { laptopBreakpoint, red } from '../../../../../styles/variables'

export const Wrapper = styled.div<{ showCitySelect: boolean }>`
  position: fixed;
  top: 112px;
  right: 0;
  z-index: 350;
  min-width: 591px;
  min-height: 580px;
  padding: 52px 120px;
  background-color: #fff;
  transform: ${props =>
    props.showCitySelect ? 'translateY(0)' : 'translateY(-125%)'};
  transition: all 0.3s;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: ${laptopBreakpoint}) {
    min-width: 320px;
    display: ${props => (props.showCitySelect ? 'block' : 'none')};
    height: 60%;
    top: initial;
    bottom: 0;
    left: 0;
    transform: initial;
    min-height: 60%;
    z-index: 700;
    padding: 44px 22px;
    overflow: auto;
  }
`

export const TitleWrapper = styled.div`
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`

export const Blur = styled.div<{ showCitySelect: boolean }>`
  @media (max-width: ${laptopBreakpoint}) {
    height: 100%;
    overflow: hidden;
    width: 100%;
    position: fixed;
    display: ${props => (props.showCitySelect ? 'block' : 'none')};
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    background-image: -moz-element(VestingWidget);
    filter: blur(10px);
    z-index: 699;
  }
`

export const Title = styled.h3`
  position: relative;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
`

export const CloseWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: -46px;
  width: 32px;
  height: 32px;
  background: url('/close-cross.svg') no-repeat;
  background-size: cover;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    top: -4px;
    left: -7px;
  }
`

export const CityPingWrap = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-right: 5px;
  }
`

export const InputWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    right: 35px;
    bottom: 17px;
    width: 20px;
    height: 22px;
    background: url('/search-icon-orange.svg') no-repeat;
    background-size: cover;
  }
`

export const CityInput = styled.input`
  width: 358px;
  height: 56px;
  margin-top: 28px;
  margin-left: -23px;
  padding: 0px 59px 0px 22px;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  color: #a1a1a1;
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-left: 0;
  }
`

export const CitiesListWrapper = styled.ul`
  max-height: 400px;
  overflow-y: scroll;
  margin-top: 23px;
`

export const CityItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  cursor: pointer;
  :hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 35px;
  }
`
