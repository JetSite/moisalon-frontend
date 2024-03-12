import { useState } from "react";
import Tags from "../../../../ui/Tags";
import { Input, Wrapper, InputWrap } from "./styled";

const Search = ({ title, query, setQuery }) => {
  const [inputValue, setInputValue] = useState(query?.query);

  const queryHandler = (e) => {
    setInputValue(e.target.value);
    setQuery({
      query: e.target.value,
      city: query.city,
    });
  };

  const queryTag = (item) => {
    setInputValue(item);
    setQuery({
      query: item,
      city: query.city,
    });
  };

  const inputSubmitHandler = (e) => {};

  return (
    <Wrapper>
      <InputWrap>
        <Input
          placeholder={title}
          value={inputValue}
          onChange={queryHandler}
          onKeyDown={inputSubmitHandler}
          type="search"
        />
      </InputWrap>
      <Tags
        tags={["Тренды", "% Sale", "Бренды", "Полезная информация"]}
        queryTag={queryTag}
      />
    </Wrapper>
  );
};

export default Search;
