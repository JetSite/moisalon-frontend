import { useState, useEffect } from 'react'
import { Wrapper, InputWrap, Input } from '../styles'

const Search = () => {
  const [inputValue, setInputValue] = useState('')
  const query = { query: '' } //TODO: query

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
          placeholder="Найти бренд"
          value={inputValue}
          onChange={queryHandler}
        />
      </InputWrap>
    </Wrapper>
  )
}

export default Search
