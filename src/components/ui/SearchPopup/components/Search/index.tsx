import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Input, Wrapper, InputWrap } from './styled';
import { ISetState } from 'src/types/common';
import Tags from 'src/components/ui/Tags';
import useAuthStore from 'src/store/authStore';
import { getStoreData } from 'src/store/utils';

export interface SearchProps {
  title: string;
  query: ISearchQuery;
  setQuery: ISetState<ISearchQuery>;
}

export interface ISearchQuery {
  query: string;
  city: string;
}

const Search: FC<SearchProps> = ({ title, query, setQuery }) => {
  const { city } = useAuthStore(getStoreData);
  const [inputValue, setInputValue] = useState(query?.query);
  const queryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    setQuery({
      query: value,
      city: city.slug,
    });
  };

  const queryTag = (item: string) => {
    setInputValue(item);
    setQuery({
      query: item,
      city: city.slug,
    });
  };

  const inputSubmitHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const key = e.key;
    if (key === 'Enter') {
      setQuery({
        query: value,
        city: city.slug,
      });
      return;
    }
    if (key === 'Escape') {
      setQuery({
        query: '',
        city: city.slug,
      });
    }
  };

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
        tags={['Тренды', '% Sale', 'Бренды', 'Полезная информация']}
        queryTag={queryTag}
      />
    </Wrapper>
  );
};

export default Search;
