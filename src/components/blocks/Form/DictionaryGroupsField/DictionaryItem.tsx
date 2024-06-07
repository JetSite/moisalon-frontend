import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import { IServiceInForm, IServiceInFormItem } from 'src/types/services'
import { IDictionaryGroupFormProps } from './DictionaryGroup'

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

const Checkbox = styled.input<{ checked?: boolean }>`
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

interface Props extends IDictionaryGroupFormProps, IServiceInFormItem {
  checked: boolean
}

const DictionaryItem: FC<Props> = ({
  push,
  remove,
  value = [],
  name,
  checked,
  id,
  title,
}) => {
  const [check, setCheck] = useState<boolean>(checked)

  useEffect(() => {
    if (!check) {
      const index = value.map(t => t.id).indexOf(id)
      if (index > -1) {
        remove(index)
      }
    } else {
      push({ id })
    }
  }, [check])

  const clickHandler = () => {
    setCheck(!check)
  }

  return (
    <CheckboxWrapper onClick={clickHandler}>
      <Checkbox name={name} type="checkbox" checked={check} />
      <Label>{title}</Label>
    </CheckboxWrapper>
  )
}

export default DictionaryItem
