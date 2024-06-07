import styled from 'styled-components'
import { red, laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  padding: 136px 140px 0 140px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 142px 40px 0 40px;
  }
`

export const FormWrapper = styled.div`
  max-width: 335px;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 80px;
`

export const Input = styled.input`
  margin-top: 53px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 18px;
  outline: none;
  &:focus {
    outline: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 90px;
    margin-bottom: 29px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  color: #797979;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

export const CheckboxWrapper = styled.div`
  height: 21px;
  margin-top: 28px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    margin-bottom: 20px;
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

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`

export const SwitchButton = styled.div<{ isActive: boolean }>`
  padding: 10px 15px;
  border: 2px solid ${props => (props.isActive ? '#797979' : 'transparent')};
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: #797979;
`

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const RegisterType = styled.div`
  max-width: 576px;
`

export const ButtonWrapper = styled.div`
  max-width: 335px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ButtonMobileWrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding: 0 40px;
  }
`

export const NotAuthorized = styled.div`
  max-width: 400px;
  margin-bottom: 40px;
  line-height: 26px;
  color: ${red};

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 18px;
  }
`
