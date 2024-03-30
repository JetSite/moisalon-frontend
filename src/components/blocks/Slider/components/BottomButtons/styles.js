import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 67px;
  margin-left: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-left: 0;
  }
`

export const ButtonStyled = styled(Button)`
  position: relative;
  &:before {
    content: '';
    width: 15px;
    height: 17px;
    background: url('/bell-icon.svg') no-repeat center;
    background-size: cover;
    position: absolute;
    top: 18px;
    left: 17px;

    @media (max-width: ${laptopBreakpoint}) {
      left: 8px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 300px;
  }
`

export const BottomText = styled.p`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ bgColor }) => (bgColor === '#000' ? '#fff' : '#000')};
  font-size: 18px;
  line-height: 25px;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    color: #000;
    font-size: 13px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Plus = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ bgColor }) => (bgColor === '#f2f0f0' ? '#fff' : '#f0f0f0')};
  position: relative;
  border-radius: 100%;
  margin-right: 24px;
  transition: all 0.2s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    width: 22px;
    height: 1px;
    background: #000;
    top: 50%;
    left: 50%;
    margin-left: -11px;
    ${BottomText}:hover & {
      background: #fff;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 22px;
    background: #000;
    top: 50%;
    margin-top: -11px;
    left: 50%;
    ${BottomText}:hover & {
      background: #fff;
    }
  }

  ${BottomText}:hover & {
    background: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 46px;
    height: 46px;
    margin-right: 19px;
    background: #fff;
  }
`
