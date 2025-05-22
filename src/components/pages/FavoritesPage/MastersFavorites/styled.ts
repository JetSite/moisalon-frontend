import { Avatar } from '@mui/material'
import { lighten } from 'polished'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  background: #fff;
`

export const Socials = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

export const ItemToggle = styled.div<{ disabled?: boolean; toggle?: boolean }>`
  width: 100%;
  position: relative;
  transition: 0.3s;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 0;
  font-weight: 500;
  color: ${props => (props.disabled ? '#e2e2e2' : '#000')};
  &:before {
    content: '';
    display: ${props => (props.disabled ? 'none' : 'block')};
    position: absolute;
    width: 9px;
    height: 9px;
    background: url('/arrow-next-2.svg') no-repeat center;
    background-size: contain;
    right: 0;
    transition: 0.3s;
    top: 50%;
    transform: ${props =>
      props.toggle ? 'rotate(90deg) translateX(-50%)' : 'translateY(-50%)'};
  }
`

export const PhoneButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 220px;
  color: #fff;
  background-color: #f03;
  border: 1px solid #f03;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: initial;
  }
`

export const PhoneLink = styled.a`
  width: 14.5px;
  height: 14.5px;
  background: url('/phone-icon.svg') no-repeat center;
  background-size: contain;
  margin-right: 20px;
`

export const EmailLink = styled.a`
  width: 16.7px;
  height: 12.2px;
  background: url('/mail-icon.svg') no-repeat center;
  background-size: contain;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.p<{ cabinet?: boolean }>`
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    display: ${props => (props.cabinet ? 'none' : 'block')};
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 24px;
  }
`

export const Content = styled.div<{ cabinet?: boolean }>`
  padding: ${props => (props.cabinet ? '0' : '60px 140px')};
  background: url('/master-slider-bg.png') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    padding: ${props => (props.cabinet ? '0' : '0 20px')};
    padding-bottom: ${props => (props.cabinet ? '0' : '40px')};
  }
`

export const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 1.7rem;
  top: -0.8rem;
`

export const SliderWrapper = styled.div`
  display: flex;
`

export const SwiperWrap = styled.div`
  width: 100%;
`

export const Item = styled.div`
  width: 220px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 467px;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    min-height: 410px;
  }
`

export const City = styled.p`
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 10px;
  }
`

export const Image = styled(Avatar)`
  margin-bottom: 15px;
`

export const BottomGoodWrapper = styled.div`
  padding: 12px 10px;
  background: #ffffff;
  border: 1px solid #ededed;
  border-top: none;
  border-radius: 5px;
  min-height: 186px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  color: #000;
  word-break: break-word;
  margin-bottom: 20px;
`

export const Specializations = styled.p`
  color: #727272;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 27px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 18px;
  }
`

export const MasterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`

export const Empty = styled.div`
  font-size: 18px;
  line-height: 30px;
`
