import { MainContainer } from "../../../styles/common";
import Search from "../../ui/Search";
import { Wrapper } from "./styled";

const SearchBlock = ({ title, noFilters = false }) => {
  return (
    <MainContainer>
      <Wrapper>
        <Search noFilters={noFilters} title={title} />
      </Wrapper>
    </MainContainer>
  );
};

export default SearchBlock;
