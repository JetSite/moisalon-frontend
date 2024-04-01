import styled from 'styled-components'
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'

export const SliderItem = styled.div`
  padding: 9px 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  width: 216px;
  min-height: 100%;
  display: flex;
  color: #fff;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    width: 180px;
  }
`

export const SliderContent = styled.div`
  border-radius: 5px;
  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 5px;
  padding-right: 5px;
`

export const SliderText = styled.p`
  word-break: break-word;
`

export const SliderImage = styled.img`
  height: 100%;
  object-position: right top;
`

export const SliderImageWrap = styled.div`
  text-align: center;
  margin-bottom: 40px;
  width: 187px;
  height: 187px;
  background: ${({ imageUrl }) => `url(${imageUrl})`} no-repeat center;
  background-size: cover;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

  @media (max-width: ${laptopBreakpoint}) {
    width: 135px;
    height: 135px;
  }
`

export const ButtonClose = styled.button`
  content: '';
  position: absolute;
  top: 12px;
  right: 11px;
  width: 22px;
  height: 22px;
  background: url('/close-cross-red.svg') no-repeat;
  background-size: contain;
  outline: none;
  border: none;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    top: 3px;
    right: 3px;
  }
`

export const DeleteSalon = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    background: url('/close-cross-red.svg') no-repeat center;
    width: 22px;
    height: 22px;
    bottom: 6px;
    right: 17px;
  }
`
