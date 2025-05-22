import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  width: 372.5px;
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
  }
`

export const SkeletonSalonItem = styled(Skeleton)`
  width: 373px;
  height: 285px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 160px;
    height: 250px;
  }
`

export const ImageWrap = styled.div`
  background: ${props => props.background};
  height: 120px;
  flex-shrink: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: ${laptopBreakpoint}) {
    flex-shrink: 0;
  }
`

export const Content = styled.div`
  position: relative;
  padding: 22px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 17px 10px 10px 10px;
  }
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: flex-start;
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

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    max-width: 85%;
  }
`

export const PhoneLink = styled.div`
  width: 14.5px;
  height: 14.5px;
  background: url('/phone-icon.svg') no-repeat center;
  background-size: contain;
`

export const EmailLink = styled.div`
  width: 16.7px;
  height: 12.2px;
  background: url('/mail-icon.svg') no-repeat center;
  background-size: contain;
  margin-left: 20px;
`

export const Info = styled.div`
  margin-bottom: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    max-height: 90px;
    margin-bottom: 0px;
  }
`

export const SalonInfo = styled.div``

export const Address = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const Activities = styled.p`
  line-height: 27px;
  font-size: 14px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    margin-bottom: 10px;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const FavoriteIcon = styled.div`
  position: absolute;
  width: 28px;
  height: 37px;
  padding: 20px;
  background: ${({ isFavorite }) =>
      isFavorite
        ? 'url(/favorite-white-item.svg)'
        : 'url(/favorite-red-item.svg)'}
    no-repeat center;
  cursor: pointer;
  right: 18px;
  top: -2px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 5px;
  }
`

export const Wrap = styled.div``
