import { useState, useContext, useEffect } from "react";
import { SearchMainQueryContext } from "../../../../../searchContext";
import { Wrapper, InputWrap, Input } from "../styled";

const Search = () => {
  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setQuery({ ...query, query: "" });
  }, []);

  const queryHandler = (e) => {
    setInputValue(e.target.value);
    setQuery({
      query: e.target.value,
    });
  };

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
  );
};

export default Search;
