import { Field } from 'react-final-form'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

const CheckboxWrapper = styled.div`
  height: 21px;
  margin-top: 28px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    margin-bottom: 20px;
  }
`

const Label = styled.p`
  font-size: 16px;
  line-height: 27px;
  color: #797979;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
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

const Checkbox = ({ label, name, checked, setChecked }) => {
  return (
    <CheckboxWrapper onClick={() => setChecked(!checked)}>
      <CheckboxElement
        type="checkbox"
        component="input"
        name={name}
        checked={checked}
      />
      <Label>{label}</Label>
    </CheckboxWrapper>
  )
}

export default Checkbox
