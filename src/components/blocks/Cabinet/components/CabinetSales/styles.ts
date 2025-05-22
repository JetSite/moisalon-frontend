import styled from 'styled-components'
import { laptopBreakpoint, red } from '../../../../../styles/variables'
import Button from 'src/components/ui/Button'
import { Quantity } from 'src/components/blocks/Form/Tabs/style'
import { LazyImage } from '@/components/newUI/common/LazyIMage'
import { Skeleton } from '@mui/material'

export const Wrapper = styled.section`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin: 0 auto;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
  }
`

export const SalesTabButton = styled(Button)`
  border: none !important;

  :disabled,
  :hover {
    background: none !important;
    color: #ff0033 !important;
  }
`

export const TitlePage = styled.h2`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 17px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: none;
  }
`

export const Subtitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 22px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 17px;
  }
`

export const AvatarContainer = styled.div`
  position: relative;
`

export const Item = styled.button<{ active?: boolean }>`
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 40px;
  padding-left: 21px;
  margin-bottom: 19px;
  cursor: pointer;
  transition: 0.3s;
  text-align: start;
  position: relative;
  border: 1px solid #f8f8f8;
  &:hover {
    border: 1px solid #000000;
    background: #fff;
    & ${AvatarContainer}::before {
      display: ${({ active }) => (active ? 'flex' : 'none')};
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 25px;
    padding-left: 11px;
  }

  & ${AvatarContainer}::before {
    display: none;
    content: '<';
    font-size: 44px;
    color: white;
    position: absolute;

    justify-content: center;
    align-items: center;
    width: 56px;
    border-radius: 100%;
    height: 56px;
    background-color: black;
    opacity: 0.5;
    z-index: 2;
  }
`

export const QuantityProfileEntyties = styled(Quantity)<{
  color?: string
}>`
  width: 32px;
  height: 32px;
  opacity: 0.8;
  font-size: 14px;
  margin: 0 20px;
  background-color: ${({ color }) => (color ? color : red)};

  ::before {
    content: attr(title);
    display: flex;
    position: absolute;
    bottom: -20px;
    color: black;
    font-size: 8px;
    white-space: nowrap;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    flex-shrink: 0;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Content = styled.div`
  margin-left: 41px;
  margin-right: auto;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 11px;
  }
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    margin-bottom: 3px;
  }
`

export const Type = styled.p`
  font-size: 18px;
  line-height: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 11px;
    line-height: 17px;
  }
`

export const Avatar = styled(LazyImage)`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  position: relative;
`

export const SkeletonWrap = styled(Skeleton)`
  width: 100%;
  height: 440px;
  margin-top: 32px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

export const SalesWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`

export const Back = styled.p`
  font-size: 24px;
  line-height: 27px;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    color: #f03;
    font-size: 16px;
  }
`