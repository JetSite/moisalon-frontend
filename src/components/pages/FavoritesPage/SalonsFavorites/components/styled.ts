import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 373.5px;
  border-radius: 5px;
  background: #ffffff;
  overflow: hidden;
  min-height: 445px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const Rent = styled.p`
  position: absolute;
  background: #f03;
  color: #fff;
  padding: 5px 18px;
  border-radius: 50px;
  left: 22px;
  top: 150px;
`

export const ImageWrap = styled.div<{ background: string }>`
  background: ${props => props.background};
  height: 195px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const Content = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: flex-start;
`

export const FavoriteIcon = styled.div`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 15px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 15px;
    top: 10px;
  }
`

export const Socials = styled.div`
  display: flex;
  align-items: center;
`

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  max-width: 90%;
`

export const PhoneLink = styled.a`
  width: 14.5px;
  height: 14.5px;
  background: url('/phone-icon.svg') no-repeat center;
  background-size: contain;
`

export const EmailLink = styled.a`
  width: 16.7px;
  height: 12.2px;
  background: url('/mail-icon.svg') no-repeat center;
  background-size: contain;
  margin-left: 20px;
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 80px;
  overflow: hidden;
  margin-bottom: 10px;
`

export const SalonInfo = styled.div`
  width: 47%;
`

export const Address = styled.p`
  width: 47%;
  font-size: 14px;
  line-height: 23px;
  color: #000;
`

export const Activities = styled.p`
  line-height: 27px;
  font-size: 14px;
  color: #000;
`

export const Count = styled.p`
  line-height: 27px;
  font-size: 14px;
  color: #727272;
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 0.5px solid #000000;
`

export const Wrap = styled.div``
