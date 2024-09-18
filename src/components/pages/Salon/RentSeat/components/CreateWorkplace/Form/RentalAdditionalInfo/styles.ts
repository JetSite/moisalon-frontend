import styled from 'styled-components'
import { Field } from 'react-final-form'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

export const Wrapper = styled.div``

export const FieldWrap = styled.div`
  margin-top: 14px;
`

export const FieldWrapItem = styled.li`
  margin-top: 14px;
`

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`

export const Desc = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 20px;
`

export const Subdesc = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #808080;
`

export const SubdescDescription = styled(Subdesc)`
  margin-top: 5px;
  font-style: italic;
`

export const Detail = styled.p`
  margin-top: 30px;
  font-size: 16px;
  text-transform: uppercase;
`

export const CheckboxWrapper = styled.li`
  margin-bottom: 15px;
`

export const CheckboxElement = styled(Field)`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked {
    & + label::before {
      background: url('/tick-checkbox.png') no-repeat center;
    }
  }

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
      props.checked ? `url("/tick-checkbox.png") no-repeat center` : ''};
  }
`

export const Label = styled.label`
  cursor: pointer;
`

export const CheckboxLicenseWrapper = styled.div`
  margin-bottom: 15px;
  margin-top: 20px;
`
