import { Field, FieldRenderProps } from 'react-final-form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { FC } from 'react'
import { IPeriod } from '../../type'

const CheckboxWrapper = styled.div`
  height: 21px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

const Label = styled.p`
  font-size: 16px;
  line-height: 27px;
  color: #797979;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }
`

const CheckboxElement = styled(Field)`
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

interface Props extends FieldRenderProps<string, HTMLElement> {
  label: string
  name: string
  checkboxPricesHandler: (e: string) => void
  rentalType: IPeriod[]
}

const Checkbox: FC<Props> = ({
  label,
  name,
  rentalType,
  checkboxPricesHandler,
  input,
  ...rest
}) => {
  return (
    <CheckboxWrapper onClick={() => checkboxPricesHandler(input.value)}>
      <CheckboxElement
        type="checkbox"
        component="input"
        name={name}
        checked={rentalType.find(type => type.id === input.value)}
        {...rest}
      />
      <Label>{label}</Label>
    </CheckboxWrapper>
  )
}

export default Checkbox
