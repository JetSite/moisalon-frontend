import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: flex-end;
  margin-right: 10px;
  margin-bottom: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    margin-bottom: 20px;
  }
`

const Checkbox = styled.div`
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
    width: 23px;
    height: 23px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #e3e3e3;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/icon-check.svg") no-repeat center` : ''};
  }
`

export const Label = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

const DictionaryItem = ({ push, remove, value = [], name, ...item }) => {
  const { checked, id, title: label } = item

  const [check, setCheck] = useState(checked)

  useEffect(() => {
    if (!check) {
      const index = value.map(t => t.id).indexOf(id)
      if (index > -1) {
        remove(index)
      }
    } else {
      push({ id, value: 1 })
    }
  }, [check])

  const clickHandler = () => {
    setCheck(!check)
  }

  return (
    <CheckboxWrapper onClick={clickHandler}>
      <Checkbox name={name} type="checkbox" checked={check} />
      <Label>{label}</Label>
    </CheckboxWrapper>
  )
}

export default DictionaryItem
