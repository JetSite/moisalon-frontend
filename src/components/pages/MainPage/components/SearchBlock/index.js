import { MainContainer } from "../../../../../styles/common";
import SearchMain from "../SearchMain";
import { Wrapper } from "./styled";

const SearchBlock = ({ showSearchPopup, setShowSearchPopup = () => {} }) => {
  return (
    <MainContainer>
      <Wrapper showSearchPopup={showSearchPopup}>
        <SearchMain setShowSearchPopup={setShowSearchPopup} />
      </Wrapper>
    </MainContainer>
  );
};

export default SearchBlock;
