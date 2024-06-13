import { useState, useEffect } from 'react'
import { Wrapper, InputWrap, Input } from '../styled'

const Search = () => {
  const [inputValue, setInputValue] = useState('')

  const queryHandler = e => {
    setInputValue(e.target.value)
    setQuery({
      query: e.target.value,
    })
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
