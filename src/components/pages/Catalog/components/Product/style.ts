import { laptopBreakpoint, red } from '../../../../../styles/variables'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import { lighten } from 'polished'

export const Wrapper = styled.div`
  max-width: 275px;
  width: 100%;
  height: 490px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border: 1px solid #ededed;
  border-radius: 5px;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;

  flex: 0 0 175px;

  &:last-child {
    flex: 0 0 175px;
  }

  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const SkeletonItem = styled(Skeleton)`
  width: 175px;
  height: 365px;
`

export const SkeletonBottom = styled(Skeleton)`
  width: 100%;
  height: 35px;
`

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  position: relative;
  z-index: 2;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Favorite = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 15px;
  top: -10px;
`

export const Content = styled.div`
  padding: 10px 10px 20px 10px;
  background: #ffffff;
  border-top: none;
  border-radius: 5px;
  position: relative;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Name = styled.p`
  max-width: 211px;
  height: 80px;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Price = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const OldPrice = styled.p`
  color: #a1a1a1;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    background: #a1a1a1;
    height: 1px;
    width: 100%;
    top: 7px;
    left: 0;
  }
`

export const NewPrice = styled.p`
  margin-right: 5px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    line-height: 16px;
  }
`

export const ButtonCart = styled.button`
  max-width: 247px;
  font-size: 10px;
  font-weight: 500;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  transition: 0.3s;
  position: relative;
  color: white;
  border: 1px solid #f03;
  border-radius: 50px;
  padding: 8px 8px;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  background-color: ${({ disabled }) => (disabled ? 'gray' : '#f03')};
  border-color: ${({ disabled }) => (disabled ? 'gray' : '#f03')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 9px;
  }
`

export const QuantityWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 66.3%;
  max-width: 116px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 86.3%;
  }
`

export const Quantity = styled.p`
  font-size: 10px;
  line-height: 16px;
`

export const Minus = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  flex-shrink: 0;
  cursor: pointer;
  background: #f0f0f0 url('/icon-minus.svg') no-repeat center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff0033 url('/icon-minus-white.svg') no-repeat center;
  }
`

export const Plus = styled(Minus)`
  background: #f0f0f0 url('/icon-plus.svg') no-repeat center;
  background-size: 13px;

  &:hover {
    background: #ff0033 url('/icon-plus-white.svg') no-repeat center;
    background-size: 13px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: wrap;
  }
`

export const Available = styled.div<{ avaible?: boolean }>`
  padding-left: 7px;
  color: ${({ avaible }) => (avaible ? 'green' : red)};
  font-size: 13px;
  font-weight: 600;
  position: relative;

  &:before {
    content: '';
    width: 5px;
    height: 5px;
    background-color: ${({ avaible }) => (avaible ? 'green' : red)};
    border-radius: 100%;
    position: absolute;
    top: 4px;
    left: 0;
  }

  @media (max-width: ${laptopBreakpoint}) {
    &:before {
      width: 4px;
      height: 4px;
      top: 5px;
    }
  }
`

export const Description = styled.p`
  max-height: 64px;
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
`

export const ProductDetails = styled.div`
  max-height: 58px;
`

export const Detail = styled.p`
  margin-bottom: 3px;
  font-size: 10px;
  color: #c6c6c6;
`

export const QuantityInPack = styled.p`
  margin-bottom: 10px;
  height: 16px;
  font-size: 14px;
  color: #c6c6c6;
  text-transform: uppercase;
  text-align: center;
`
