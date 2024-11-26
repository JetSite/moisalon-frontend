import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import { laptopBreakpoint, red } from '../../../styles/variables'
import Link from 'next/link'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  width: 372px;
  border-radius: 5px;
  background: #ffffff;
  overflow: hidden;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  height: 100%;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: initial;
  }
`

export const ImageWrap = styled.div<{ background: string }>`
  background: ${props => props.background};
  height: 195px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: ${laptopBreakpoint}) {
    height: 140px;
    flex-shrink: 0;
  }
`

export const Content = styled.div`
  position: relative;
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 17px 10px 8px 10px;
    height: 50%;
  }
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 10px;
  }
`

export const Socials = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`

export const Name = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #000;
  max-width: 90%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    max-width: 85%;
  }
`

export const PhoneLink = styled(Link)`
  width: 14.5px;
  height: 14.5px;
  background: url('/phone-icon.svg') no-repeat center;
  background-size: contain;
`

export const EmailLink = styled(Link)`
  width: 16.7px;
  height: 12.2px;
  background: url('/mail-icon.svg') no-repeat center;
  background-size: contain;
  margin-left: 20px;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`

export const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const BottomRight = styled.div`
  display: flex;
  width: 40%;
  text-align: right;
`

export const AdOffer = styled.p`
  color: ${red};
  font-size: 20px;
  font-weight: 600;
`

export const Address = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #000;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    overflow: hidden;
    display: -webkit-box;
  }
`

export const Category = styled.p`
  flex-grow: 1;
  line-height: 22px;
  font-size: 15px;
  font-weight: 600;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
  }
`

export const FavoriteIcon = styled.div`
  position: absolute;
  width: 28px;
  height: 37px;
  padding: 20px;
  cursor: pointer;
  right: 18px;
  top: -10px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 15px;
  }
`

export const SkeletonSalonItem = styled(Skeleton)`
  width: 372px;
  height: 360px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: 277px;
  }
`

export const ShareWrap = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`

export const AdShareWrap = styled(ShareWrap)`
  top: 160px;
  right: 6px;
  @media (max-width: ${laptopBreakpoint}) {
    top: 100px;
    right: 2px;
  }
`
