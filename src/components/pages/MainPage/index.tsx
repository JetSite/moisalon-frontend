import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import About from './components/About'
import MainLayout from '../../../layouts/MainLayout'
import MainMasterSlider from './components/MainMasterSlider'
import MainSalonsSlider from './components/MainSalonsSlider'
import MainBrandsSlider from './components/MainBrandsSlider'
import MobileViewCards from './components/MobileViewCards'
import Ribbon from './components/Ribbon'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { MobileHidden, MobileVisible } from '../../../styles/common'
import SearchBlock from '../../blocks/SearchBlock'
import Banners from '../Catalog/components/Banners'
import { CSSTransition } from 'react-transition-group'
import { WrapBanner } from '../Brand/AllBrands/styles'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import MainAdsSlider from './components/MainAdsSlider'
import { FC } from 'react'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity } from 'src/types'
import MainRentSlider from './components/MainRentSlider'

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
`

export interface IMainPageProps {
  beautyCategories: any
  beautyAllContent: any
  bannerHooks: any
  totalCount: ITotalCount
  cityData: ICity
}

const MainPage: FC<IMainPageProps> = ({
  beautyCategories,
  beautyAllContent,
  bannerHooks,
  totalCount,
  cityData,
}) => {
  const { me, city } = useAuthStore(getStoreData)
  const query = { query: '' } //TODO: query
  return (
    <MainLayout>
      <>
        <MobileHidden>
          <SearchBlock title="Найти салон / мастер / бренд" />
        </MobileHidden>
        <Title>{`Лучшие салоны красоты  и spa (спа) в городе ${cityData}`}</Title>
        <CSSTransition
          in={!query?.query}
          timeout={500}
          classNames="banner"
          unmountOnExit
        >
          <WrapBanner>
            <MobileHidden>
              {bannerHooks?.data[0]?.attributes?.banners?.data?.length ||
              bannerHooks?.data[1]?.attributes?.banners?.data?.length ? (
                <Banners
                  bannersByHookWide={bannerHooks?.data[1]}
                  bannersByHookSmall1={bannerHooks?.data[2]}
                  bannersByHookSmall2={bannerHooks?.data[3]}
                />
              ) : null}
            </MobileHidden>
          </WrapBanner>
        </CSSTransition>
        <MobileViewCards
          totalCount={totalCount}
          // totalSales={sales?.salesSearch?.connection?.nodes?.length}
        />
        <MobileVisible>
          {bannerHooks?.data[0]?.attributes?.banners?.data?.length ||
          bannerHooks?.data[1]?.attributes?.banners?.data?.length ? (
            <Banners
              bannersByHookWide={bannerHooks?.data[0]}
              bannersByHookSmall1={bannerHooks?.data[1]}
              bannersByHookSmall2={bannerHooks?.data[2]}
            />
          ) : null}
        </MobileVisible>
        {/* {query?.query?.length ? <SearchResults me={me} /> : null} */}
        <MainAdsSlider city={city} />
        {/* <MainGoodsSlider me={me} /> */}
        <MainRentSlider city={city} />
        {/* <MainWorkplacesSlider me={me} /> */}
        <MainMasterSlider city={city} />
        <MainSalonsSlider city={city} />
        <MainBrandsSlider city={city} />
        <About />
        <Ribbon
          title="Бьюти-лента"
          beautyCategories={beautyCategories}
          beautyAllContent={beautyAllContent}
        />
      </>
    </MainLayout>
  )
}

export default MainPage
