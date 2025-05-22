import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import { laptopBreakpoint } from '../../../styles/variables'
import { LazyImage } from '@/components/newUI/common/LazyIMage'

export const Wrapper = styled.div`
  position: relative;
  width: 372px;
  border-radius: 5px;
  background: #ffffff;
  overflow: hidden;
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
    height: 340px;
  }
`

export const ImageWrap = styled.div`
  width: 100%;
  height: 195px;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
    flex-shrink: 0;
  }
`

export const Image = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 20px;
  align-items: flex-start;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 10px;
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
  min-height: 42px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;

  @media (max-width: ${laptopBreakpoint}) {
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    max-width: 85%;
  }
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
  height: 69px;
  overflow: hidden;
  margin-bottom: 10px;
`

export const Address = styled.p`
  width: 47%;
  font-size: 12px;
  line-height: 23px;
  color: #000;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }
`

export const Activities = styled.ul`
  line-height: 1.7;
  font-size: 12px;
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

export const Activity = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SalonInfo = styled.div`
  width: 47%;
`

export const Wrap = styled.div`
  height: 131px;
  @media (max-width: ${laptopBreakpoint}) {
    height: initial;
  }
`

export const FavoriteIcon = styled.button<{ isFavorite: boolean }>`
  border: none;
  padding: 0;
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

export const Rent = styled.p`
  position: absolute;
  background: #f03;
  color: #fff;
  padding: 5px 18px;
  border-radius: 50px;
  left: 22px;
  top: 150px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 8px;
    padding: 5px 12px;
    left: 7px;
    top: 7px;
  }
`

export const ShareWrap = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`

export const SalonShareWrap = styled(ShareWrap)`
  top: 160px;
  right: 6px;
  @media (max-width: ${laptopBreakpoint}) {
    top: 100px;
    right: 2px;
  }
`
