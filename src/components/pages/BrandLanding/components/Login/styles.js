import styled from 'styled-components'
import {
  laptopBreakpoint,
  tabletBreakpoint,
  red,
} from '../../../../../styles/variables'

export const Wrapper = styled.div`
  min-height: 736px;
  background: #f2f0f0;
  position: relative;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: #f2f0f0;
`

export const Content = styled.div`
  padding: 161px 140px 0 140px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 40px 20px;
  }
`

export const FormWrapper = styled.div`
  max-width: 505px;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 66%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const FormStyled = styled.form`
  width: 100%;
  max-width: 335px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 100%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: auto;
    max-width: 100%;
  }
`

export const Input = styled.input`
  margin-top: 30px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  background: ${({ bg }) => bg};
  border: none;
  border-bottom: 1px solid #000;
  font-size: 18px;
  outline: none;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: #000;
  }
  &::-moz-placeholder {
    color: #000;
  }
  &:-ms-input-placeholder {
    color: #000;
  }
  &:-moz-placeholder {
    color: #000;
  }

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Comment = styled.textarea`
  padding: 10px;
  background: ${({ bg }) => bg};
  resize: none;
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

export const LabelComment = styled.p`
  margin-top: 25px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

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
    margin-top: 20px;
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

export const Title = styled.h2`
  color: ${red};
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 74%;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
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
    padding: 0 20px;
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

export const Photo = styled.div`
  width: 673px;
  height: 571px;
  position: absolute;
  right: 94px;
  bottom: 0;
  background: url('/for-brand-login-woman.png') no-repeat center;
  background-size: contain;
  z-index: 1;

  @media (max-width: ${tabletBreakpoint}) {
    display: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`
