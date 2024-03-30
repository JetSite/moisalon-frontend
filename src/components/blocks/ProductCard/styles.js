import styled from 'styled-components'
import { lighten } from 'polished'
import { Skeleton } from '@material-ui/lab'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  width: 175px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border: 1px solid #ededed;
  border-radius: 5px;
  transition: box-shadow 0.3s ease-in-out;

  flex: 0 0 175px;

  &:last-child {
    flex: 0 0 175px;
  }

  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex: 0 0 135px;
    width: 135px;

    &:last-child {
      flex: 0 0 135px;
    }
  }
`

export const SkeletonItem = styled(Skeleton)`
  width: 175px;
  height: 365px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 161px;
  }
`

export const SkeletonBottom = styled(Skeleton)`
  width: 100%;
  height: 35px;
`

export const TopGoodWrapper = styled.div`
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  justify-content: flex-end;
  @media (max-width: ${laptopBreakpoint}) {
    width: 129px;
    height: 129px;
  }
`

export const Image = styled.img`
  height: 90%;
  object-fit: contain;
  width: 90%;
`

export const Favorite = styled.div`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 5px;
  }
`

export const BottomGoodWrapper = styled.div`
  padding: 22px 10px;
  background: #ffffff;
  border-top: none;
  border-radius: 5px;
  min-height: 186px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 170px;
  }
`

export const Name = styled.p`
  max-width: 211px;
  max-height: 60px;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    max-height: 40px;
  }
`

export const Price = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  position: relative;
  width: 100%;
`

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 25px;
`

export const OldPrice = styled.p`
  color: #a1a1a1;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  text-decoration: line-through;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const NewPrice = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff0033;
  font-weight: 600;
`

export const ButtonCart = styled.button`
  width: 48%;
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
  background-color: #f03;
  border: 1px solid #f03;
  border-radius: 50px;
  padding: 8px 0px;

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
  width: 66.3%;
  max-width: 116px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 90%;
  }
`

export const Quantity = styled.p`
  font-size: 10px;
  line-height: 16px;
`

export const Minus = styled.div`
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
`
