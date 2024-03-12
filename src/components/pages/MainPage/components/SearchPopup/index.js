import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  MeContext,
  SearchMainQueryContext,
} from "../../../../../searchContext";
import styled from "styled-components";
import SearchBlock from "../SearchBlock";

const SearchPopupWrapper = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  padding-bottom: 35px;
  background: #fff;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-20px)")};
  transition: 0.4s;
`;

const CloseBtn = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: -59px;
  left: 12px;
  width: 42px;
  height: 42px;
  background: #fff url("/close-cross.svg") no-repeat center;
  background-size: cover;
  z-index: 100;
`;

const SearchPopup = ({
  setSearchResults,
  inputValue,
  setInputValue,
  showSearchPopup,
  setShowSearchPopup,
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [me] = useContext(MeContext);
  const b2bClient = !!me?.master?.id || !!me?.salons?.length;

  useEffect(() => {
    if (router.query.q === "search") {
      setShowSearchPopup(true);
    }
    if (
      (pathname === `/[city]/master` ||
        pathname === `/[city]/salon` ||
        pathname === "/[city]/brand" ||
        pathname === "/[city]/beautyFreeShop") &&
      query?.query?.length
    ) {
      setShowSearchPopup(true);
    }
  }, [pathname]);

  const closehandler = () => {
    setShowSearchPopup(false);
  };

  return (
    <SearchPopupWrapper show={showSearchPopup}>
      <CloseBtn show={showSearchPopup} onClick={closehandler} />
      <SearchBlock
        setSearchResults={setSearchResults}
        inputValue={inputValue}
        setInputValue={setInputValue}
        showSearchPopup={showSearchPopup}
        setShowSearchPopup={setShowSearchPopup}
      />
    </SearchPopupWrapper>
  );
};

export default SearchPopup;
