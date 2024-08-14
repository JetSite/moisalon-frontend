import { ISalon } from "src/types/salon";
import { SearchListWrapper } from "../styled";
import { FC } from "react";

interface Props {
  searchResults: any;
}

const SearchResults: FC<Props> = ({ searchResults }) => {
  return <SearchListWrapper>{searchResults}</SearchListWrapper>;
};

export default SearchResults;
