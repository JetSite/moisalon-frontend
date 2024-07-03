import { Field } from 'react-final-form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import Button from '../../../../../ui/Button'

export const FieldWrap = styled.div`
  margin-bottom: 14px;
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

export const Title = styled.p`
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-transform: none;
  }
`

export const Desc = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 20px;
`

export const DescTitle = styled(Desc)`
  margin-bottom: 10px;
`

export const DescPhoto = styled(Desc)`
  @media (max-width: ${laptopBreakpoint}) {
    text-align: center;
  }
`

export const Subdesc = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #808080;
  /* margin-bottom: 20px; */
`

export const PhotoWrap = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin: 20px 0px;
  margin-bottom: 50px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 133px;
  }
`

export const CheckboxWrapper = styled.div`
  height: 21px;
  margin-top: 28px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`

export const Back = styled.p`
  cursor: pointer;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
  }
`

export const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + p {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + p::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/tick-checkbox.png") no-repeat center` : ''};
  }
`

export const CustomButton = styled(Button)`
  width: 455px;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    font-size: 14px;
  }
`

export const SupportText = styled.p`
  margin-bottom: 50px;
  font-size: 14px;
  line-height: 24px;
  color: #808080;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
    font-size: 12px;
    line-height: 20px;
    position: relative;
    /* top: -20px; */
  }
`

export const SupportLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #000;
  }
`

export const ButtonsBlockText = styled.p`
  width: 455px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const SupportTextBottom = styled(SupportText)`
  margin-top: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    text-align: center;
  }
`
