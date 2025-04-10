import { FC } from 'react';
import Search, { SearchProps } from '../Search';
import { Wrapper } from './styled';

type Props = SearchProps;

const SearchBlock: FC<Props> = ({ title, query, setQuery }) => {
  return (
    <Wrapper>
      <Search title={title} query={query} setQuery={setQuery} />
    </Wrapper>
  );
};

export default SearchBlock;
