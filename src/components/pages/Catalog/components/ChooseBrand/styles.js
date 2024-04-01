import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Choose = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  cursor: pointer;
  position: relative;
  width: 185px;
  transition: 0.3s;
  &:hover {
    color: #f03;
  }
  &:after {
    content: '';
    transition: 0.3s;
    position: absolute;
    background: url('/arrow-back.svg') no-repeat center;
    width: 15px;
    height: 15px;
    transform: ${props => (props.active ? 'rotate(270deg)' : 'rotate(180deg)')};
    top: 6px;
    right: 0;
  }
`

export const ContentChooseBrand = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px 0 140px;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 0 20px;
  }
`

export const CloseIconWrap = styled.div`
  position: absolute;
  cursor: pointer;
  right: 75px;
  top: 10px;
  z-index: 1;
  @media (max-width: ${laptopBreakpoint}) {
    right: 45px;
    top: 17px;
  }
`

export const WrapperBrands = styled.div`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  background: #f8f8f8;
  padding: 35px;
  margin-top: 25px;
  width: 100%;
  z-index: 3;
  max-height: 335px;
  @media (max-width: ${laptopBreakpoint}) {
    background: #fff;
    padding: 0;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 67px;
      background: #f8f8f8;
      left: 0;
      top: 0;
      right: 0;
      z-index: 0;
    }
  }
`

export const Wrapper = styled.div`
  position: relative;
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Item = styled.div`
  width: 20%;
  margin-bottom: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const Element = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  white-space: nowrap;
  margin-bottom: 5px;
  color: #000;
  transition: 0.3s;
  &:hover {
    color: #f03;
  }
  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    z-index: -1;
  }
`

export const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    position: sticky;
    padding: 20px;
    margin-bottom: 20px;
    top: -1px;
  }
`
