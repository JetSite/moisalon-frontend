import styled from 'styled-components'
import { laptopBreakpoint } from 'src/styles/variables'

export const Checkbox = styled.input<{ checked?: boolean }>`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
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
      props.checked ? `url("/icon-check.svg") no-repeat center` : ''};
  }
`

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 2px solid #e3e3e3;
  border-radius: 100%;
`

export const Radio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ ${Checkmark} {
    border: 1px solid #000000;
    &:after {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #000;
      content: '';
      border-radius: 100%;
      top: 1px;
      left: 1px;
    }
  }
`

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const Label = styled.label`
  font-size: 1.6rem;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

export const Wrapper = styled.div`
  margin-bottom: 15px;
`

export const Content = styled.div`
  margin-top: 15px;
`

export const CategoryWrap = styled.div`
  margin-left: 14px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`

export const ContentWrap = styled.div`
  padding-bottom: 32px;
  border-bottom: 1px solid #000000;
  margin-bottom: 32px;
`

export const PriceWrap = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`

export const BlockTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  margin-right: 170px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 20px;
  }
`

export const SelectWrap = styled.div`
  display: flex;
  width: 100px;
`

export const LeftGroup = styled.div`
  margin-right: 170px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`

export const More = styled.button`
  color: #f03;
  border-bottom: 1px dotted #f03;
  display: inline;
  :disabled {
    cursor: default;
    color: gray;
    border-bottom: 1px dotted gray;
  }
`

export const Block = styled.div`
  display: flex;
  padding-bottom: 32px;
  border-bottom: 1px solid #000000;
  margin-bottom: 32px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

export const PriceFields = styled.div`
  display: flex;
  flex-direction: column;
`

export const WrapButton = styled.div`
  margin-bottom: 32px;
  margin-right: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 16px;
    width: 100%;
  }
`

export const ButtonsWrap = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

export const PriceFieldsWrapper = styled(PriceFields)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
  }
`
