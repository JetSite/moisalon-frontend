import { useState, useEffect, FC } from 'react'
import { Wrapper, InputWrap, Input } from '../styled'

interface Props {
  inputValue: string
  setInputValue: (value: string) => void
}

const Search: FC<Props> = ({ inputValue, setInputValue }) => {
  const queryHandler = (e: any) => {
    setInputValue(e.target.value)
  }

  return (
    <Wrapper>
      <InputWrap>
        <Input
          placeholder="Найти салон"
          value={inputValue}
          onChange={queryHandler}
        />
      </InputWrap>
    </Wrapper>
  )
}

export default Search
