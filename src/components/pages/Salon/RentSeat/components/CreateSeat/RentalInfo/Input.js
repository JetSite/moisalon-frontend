import React from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../styles/variables'

const InputWrapper = styled.div`
  position: relative;

  &:after {
    content: '₽';
    position: absolute;
    right: 22px;
    top: 0;
  }

  @media (max-width: ${laptopBreakpoint}) {
    &:after {
      right: 0;
    }
  }
`

const InputElement = styled.input`
  width: 100%;
  padding-bottom: 5px;
  border: none;
  border-bottom: 1px solid #808080;

  &:focus {
    outline: none;
    border-bottom-color: #000;
  }
`

const Input = ({
  name,
  type,
  placeholder,
  chosenRentalRents,
  chooseRentalPrice,
  ...rest
}) => {
  const changeValueHandler = e => {
    chooseRentalPrice(name, e.target.value)
  }
  return (
    <InputWrapper>
      <InputElement
        name={name}
        type={type}
        placeholder={placeholder}
        value={chosenRentalRents[name]}
        onChange={changeValueHandler}
        {...rest}
      />
    </InputWrapper>
  )
}

export default Input
