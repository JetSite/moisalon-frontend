import { Field } from 'react-final-form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 730px;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 44px;
  }
`

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 90px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`

export const Form = styled.form``

export const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 93px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 85px;
  }
`

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`

export const VideoFieldWrap = styled.div`
  margin-top: 63px;
  margin-bottom: 62px;
`

export const FieldTitleStyled = styled.p<{ requiredField?: boolean }>`
  position: relative;
  width: fit-content;
  margin-bottom: 32px;
  margin-top: 32px;
  color: #797979;
  font-size: 18px;

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

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 25px;
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
