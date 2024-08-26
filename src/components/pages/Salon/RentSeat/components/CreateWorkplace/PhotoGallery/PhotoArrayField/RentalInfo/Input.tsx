import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../../styles/variables'
import { IPeriod } from '../../../type'
import { ISetState } from 'src/types/common'
import { useForm } from 'react-final-form'

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
}

const Input: FC<Props> = ({
  name,
  type,
  placeholder,
  periods,
  setPeriods,
  ...rest
}) => {
  const findType = periods.find(e => {
    return e.id === name
  })
  const { mutators } = useForm()

  const [value, setValue] = useState<string>(
    findType?.rentalCoast?.toString() || '',
  )

  useEffect(() => {
    if (periods.find(e => e.id === 'CustomRate')) setValue('')
  }, [periods])

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    const newArr = periods.map(type => {
      if (type.id !== name) {
        return type
      } else {
        return { id: type.id, rentalCoast: Number(value) }
      }
    })
    console.log(newArr)

    setPeriods(newArr)
    mutators.update('period', () => newArr)
  }

  return (
    <InputWrapper>
      <InputElement
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeValueHandler}
        {...rest}
      />
    </InputWrapper>
  )
}

export default Input
