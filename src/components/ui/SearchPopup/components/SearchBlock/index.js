import Search from "../Search";
import { Wrapper } from "./styled";

const SearchBlock = ({ title, query, setQuery }) => {
  return (
    <Wrapper>
      <Search title={title} query={query} setQuery={setQuery} />
    </Wrapper>
  );
};

export default SearchBlock;
