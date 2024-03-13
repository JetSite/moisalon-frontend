import { useContext } from "react";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../styles/variables";
import About from "./components/About";
import MainLayout from "../../../layouts/MainLayout";
import MainMasterSlider from "./components/MainMasterSlider";
import MainSalonsSlider from "./components/MainSalonsSlider";
import MainBrandsSlider from "./components/MainBrandsSlider";
import MainAdsSlider from "./components/MainAdsSlider";
import MainGoodsSlider from "./components/MainGoodsSlider";
import MainRentSlider from "./components/MainRentSlider";
import MainWorkplacesSlider from "./components/MainWorkplacesSlider";
import SearchResults from "./components/SearchMain/SearchResults";
import MobileViewCards from "./components/MobileViewCards";
import Ribbon from "./components/Ribbon";
import {
  MeContext,
  SearchMainQueryContext,
  CityContext,
} from "../../../searchContext";
import { MobileHidden, MobileVisible } from "../../../styles/common";
import SearchBlock from "../../blocks/SearchBlock";
import Banners from "../Catalog/components/Banners";
import { CSSTransition } from "react-transition-group";
import { WrapBanner } from "../Brand/AllBrands/styles";

const Title = styled.h1`
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 36px;
  padding: 0 140px;
  font-size: 22px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 16px 0;
    padding: 0 20px;
    font-size: 16px;
    text-align: center;
  }
`;

const MainPage = ({
  totalSalons,
  totalMasters,
  totalBrands,
  beautyCategories,
  beautyAllContent,
  sales,
  cityData,
}) => {
  const [me] = useContext(MeContext);
  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [city] = useContext(CityContext);

  return (
    <MainLayout>
      <>
        {/* <MobileHidden>
          <SearchBlock title="Найти салон / мастер / бренд" />
        </MobileHidden> */}
        <Title>{`Лучшие салоны красоты  и spa (спа) в городе ${cityData}`}</Title>
        {/* <CSSTransition
          in={!query?.query}
          timeout={500}
          classNames="banner"
          unmountOnExit
        >
          <WrapBanner>
            <MobileHidden>
              {bannersByHookWide?.bannersByHookCode?.length ||
              bannersByHookSmall1?.bannersByHookCode?.length ||
              bannersByHookSmall2?.bannersByHookCode?.length ? (
                <Banners
                  bannersByHookWide={bannersByHookWide?.bannersByHookCode}
                  bannersByHookSmall1={bannersByHookSmall1?.bannersByHookCode}
                  bannersByHookSmall2={bannersByHookSmall2?.bannersByHookCode}
                />
              ) : null}
            </MobileHidden>
          </WrapBanner>
        </CSSTransition>
        <MobileViewCards
          totalSalons={totalSalons}
          totalMasters={totalMasters}
          totalBrands={totalBrands}
          totalSales={sales?.salesSearch?.connection?.nodes?.length}
        />
        <MobileVisible>
          {bannersByHookWide?.bannersByHookCode?.length ||
          bannersByHookSmall1?.bannersByHookCode?.length ||
          bannersByHookSmall2?.bannersByHookCode?.length ? (
            <Banners
              bannersByHookWide={bannersByHookWide?.bannersByHookCode}
              bannersByHookSmall1={bannersByHookSmall1?.bannersByHookCode}
              bannersByHookSmall2={bannersByHookSmall2?.bannersByHookCode}
            />
          ) : null}
        </MobileVisible>
        {query?.query?.length ? <SearchResults me={me} /> : null} */}
        {/* <MainAdsSlider me={me} />
        <MainGoodsSlider me={me} />
        <MainRentSlider me={me} />
        <MainWorkplacesSlider me={me} />
        <MainMasterSlider me={me} />
        <MainSalonsSlider me={me} />
        <MainBrandsSlider me={me} /> */}
        {/* <About me={me} /> */}
        {/* <Ribbon
          title="Бьюти-лента"
          beautyCategories={beautyCategories}
          beautyAllContent={beautyAllContent}
        /> */}
      </>
    </MainLayout>
  );
};

export default MainPage;
