import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { IPeriod } from '../../type'
import { ISetState } from 'src/types/common'
import { useForm } from 'react-final-form'
import { FormApi } from 'final-form'

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

interface Props {
  periods: IPeriod[]
  setPeriods: ISetState<IPeriod[]>
  name: string
  type?: string
  placeholder?: string
  maxLength?: number
  min?: string | number
  form: FormApi<Record<string, any>>
}

const Input: FC<Props> = ({
  name,
  type,
  placeholder,
  periods,
  setPeriods,
  form,
  ...rest
}) => {
  const findType = periods.find(e => e.id === name)
  const [value, setValue] = useState<string>(
    findType?.rentalCoast?.toString() || '',
  )

  useEffect(() => {
    if (periods.find(e => e.id === 'CustomRate')) setValue('')
  }, [periods])

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value
    setValue(currentValue)
    const newArr = periods.map(type => {
      if (type.id !== name) {
        return type
      } else {
        return { id: type.id, rentalCoast: Number(currentValue) }
      }
    })
    form.change('rentalPeriod', newArr)
    setPeriods(newArr)
  }

  return (
    <InputWrapper>
      <InputElement
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          const findType = periods.find(type => type.id === name)
          if (!findType) {
            const newArr = [...periods, { id: name }]
            form.change('rentalPeriod', newArr)
            setPeriods(newArr)
          }
        }}
        onChange={changeValueHandler}
        {...rest}
      />
    </InputWrapper>
  )
}

export default Input
