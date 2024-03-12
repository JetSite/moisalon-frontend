import React, { useContext, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { MainContainer } from "../../../../styles/common";
import SalonsSearchResults from "../../../pages/MainPage/components/SearchMain/SalonsSearchResults";
import SearchBlock from "../../../blocks/SearchBlock";
import { WrapBanner } from "./styles";
import { WrapperResults } from "../../../pages/MainPage/components/SearchMain/styled";
import MobileViewCards from "../../../pages/MainPage/components/MobileViewCards";
import { SearchMainQueryContext } from "../../../../searchContext";
import { MobileHidden } from "../../../../styles/common";
import Banner from "./components/Banner";

const AllRentPage = ({
  salonSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  me,
  cityData,
}) => {
  const [query] = useContext(SearchMainQueryContext);
  const [view, setView] = useState("list");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <>
      <MobileViewCards
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
      />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>
      <MobileHidden>
        <CSSTransition
          in={(!query?.query && view === "list") || filterOpen}
          timeout={500}
          classNames="banner"
          unmountOnExit
        >
          <WrapBanner>
            <Banner me={me} />
          </WrapBanner>
        </CSSTransition>
      </MobileHidden>
      <MainContainer>
        <WrapperResults>
          <SalonsSearchResults
            rent
            view={view}
            setView={setView}
            salonSearch={salonSearch}
            me={me}
            setFilterOpen={setFilterOpen}
            filterOpen={filterOpen}
            cityData={cityData}
          />
        </WrapperResults>
      </MainContainer>
    </>
  );
};

export default AllRentPage;
