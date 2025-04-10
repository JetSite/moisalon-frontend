import styled from 'styled-components';
import { laptopBreakpoint } from '../../../styles/variables';
import About from './components/About';
import MainLayout from '../../../layouts/MainLayout';
import MainMasterSlider from './components/MainMasterSlider';
import MainSalonsSlider from './components/MainSalonsSlider';
import MainBrandsSlider from './components/MainBrandsSlider';
import MobileViewCards from './components/MobileViewCards';
import Ribbon from './components/Ribbon';
import useAuthStore from 'src/store/authStore';
import { getStoreData } from 'src/store/utils';
import { MobileHidden, MobileVisible } from '../../../styles/common';
import SearchBlock from '../../blocks/SearchBlock';
import Banners from '../Catalog/components/Banners';
import { CSSTransition } from 'react-transition-group';
import { WrapBanner } from '../Brand/AllBrands/styles';
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse';
import MainAdsSlider from './components/MainAdsSlider';
import { FC } from 'react';
import { ITotalCount } from 'src/pages/[city]/salon';
import { ICity } from 'src/types';
import MainRentSlider from './components/MainRentSlider';
import { IBannerHook } from 'src/types/banners';
import { useRouter } from 'next/router';
import SearchResults from './components/SearchMain/SearchResults';
import { MIN_SEARCH_LENGTH } from './components/SearchMain/utils/useSearch';

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

export interface IMainPageProps {
  beautyCategories: any;
  beautyAllContent: any;
  bannerHooks: IBannerHook[];
  totalCount: ITotalCount;
  cityData: ICity;
}

const MainPage: FC<IMainPageProps> = ({
  beautyCategories,
  beautyAllContent,
  bannerHooks,
  totalCount,
  cityData,
}) => {
  const { query } = useRouter();
  const isSearch =
    typeof query['search'] === 'string' &&
    query['search']?.length >= MIN_SEARCH_LENGTH;

  const bannerTopLarge = bannerHooks.find(e => e.id === '1') ?? null;
  const bannerTopSmallLeft = bannerHooks.find(e => e.id === '2') ?? null;
  const bannerTopSmallRight = bannerHooks.find(e => e.id === '3') ?? null;

  return (
    <MainLayout>
      <>
        <MobileHidden>
          <SearchBlock title="Найти салон / мастер / бренд" />
        </MobileHidden>
        {!isSearch ? (
          <>
            <Title>{`Лучшие салоны красоты  и spa (спа) в городе ${cityData.name}`}</Title>
            <CSSTransition
              in={true}
              timeout={500}
              classNames="banner"
              unmountOnExit
            >
              <WrapBanner>
                <MobileHidden>
                  {bannerHooks ? (
                    <Banners
                      bannerLarge={bannerTopLarge}
                      bannerSmallLeft={bannerTopSmallLeft}
                      bannerSmallRight={bannerTopSmallRight}
                    />
                  ) : null}
                </MobileHidden>
              </WrapBanner>
            </CSSTransition>
          </>
        ) : null}
        <MobileViewCards
          totalCount={totalCount}
          // totalSales={sales?.salesSearch?.connection?.nodes?.length}
        />
        {!isSearch && bannerHooks?.length ? (
          <MobileVisible>
            <Banners
              bannerLarge={bannerTopLarge}
              bannerSmallLeft={bannerTopSmallLeft}
              bannerSmallRight={bannerTopSmallRight}
            />
          </MobileVisible>
        ) : null}
        {isSearch ? (
          <SearchResults searchValue={query?.['search'] as string} />
        ) : null}
        <MainAdsSlider city={cityData} />
        {/* <MainGoodsSlider me={me} /> */}
        <MainRentSlider city={cityData} />
        {/* <MainWorkplacesSlider me={me} /> */}
        <MainMasterSlider city={cityData} />
        <MainSalonsSlider city={cityData} />
        <MainBrandsSlider city={cityData} />
        <About />
        <Ribbon
          title="Бьюти-лента"
          beautyCategories={beautyCategories}
          beautyAllContent={beautyAllContent}
        />
      </>
    </MainLayout>
  );
};

export default MainPage;
