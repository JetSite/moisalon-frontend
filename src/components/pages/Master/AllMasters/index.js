import { MainContainer } from "../../../../styles/common";
import MastersSearchResults from "../../../pages/MainPage/components/SearchMain/MastersSearchResults";
import SearchBlock from "../../../blocks/SearchBlock";
import Line from "../../../pages/MainPage/components/Line";
import MobileViewCards from "../../../pages/MainPage/components/MobileViewCards";
import { CategoryImage, WrapBanner } from "./styles";
import { WrapperResults } from "../../../pages/MainPage/components/SearchMain/styled";
import { useContext } from "react";
import { SearchMainQueryContext } from "../../../../searchContext";
import { CSSTransition } from "react-transition-group";
import { MobileHidden } from "../../../../styles/common";

const AllMastersPage = ({
  masterSearch,
  totalBrands,
  totalMasters,
  totalSalons,
}) => {
  const [query] = useContext(SearchMainQueryContext);

  return (
    <>
      <MobileViewCards
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
      />
      <MobileHidden>
        <SearchBlock title="Найти своего мастера" />
      </MobileHidden>
      <CSSTransition
        in={!query?.query}
        timeout={500}
        classNames="banner"
        unmountOnExit
      >
        <WrapBanner>
          <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
          <CategoryImage />
        </WrapBanner>
      </CSSTransition>
      <MainContainer>
        <WrapperResults>
          <MastersSearchResults masterSearch={masterSearch} />
        </WrapperResults>
      </MainContainer>
    </>
  );
};

export default AllMastersPage;
