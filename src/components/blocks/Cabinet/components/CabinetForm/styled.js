import { Field } from 'react-final-form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
    padding-top: 0px;
  }
`

export const Title = styled.p`
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 17px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 23px;
    text-transform: none;
  }
`

export const SubTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 49px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`

export const Flex = styled.div`
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    flex-direction: column-reverse;
  }
`

export const ButtonWrap = styled.div`
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

export const FieldStyled = styled(Field)`
  label {
    width: fit-content;
    &:after {
      display: ${({ requiredField }) => (requiredField ? 'block' : 'none')};
      content: '';
      position: absolute;
      top: -3px;
      right: -11px;
      width: 7px;
      height: 7px;
      background: url('/required-icon.svg') no-repeat center;
    }
  }
`
