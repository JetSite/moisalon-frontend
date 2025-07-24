import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import MainLayout from '../../../layouts/MainLayout'
import MobileViewCards from './components/MobileViewCards'
import { MobileHidden, MobileVisible } from '../../../styles/common'
import SearchBlock from '../../blocks/SearchBlock'
import Banners from '../Catalog/components/Banners'
import { CSSTransition } from 'react-transition-group'
import { WrapBanner } from '../Brand/AllBrands/styles'
import { FC, Suspense } from 'react'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity } from 'src/types'
import { IBannerHook } from 'src/types/banners'
import { useRouter } from 'next/router'
import SearchResults from './components/SearchMain/SearchResults'
import { MIN_SEARCH_LENGTH } from './components/SearchMain/utils/useSearch'
import { IBeautyCategories, IFeed } from '@/types/feed'
import dynamic from 'next/dynamic'
import LoadingComponent from './components/LoadingComponent'
import MainAdsSlider from './components/MainAdsSlider'
import MainRentSlider from './components/MainRentSlider'

const MainMasterSlider = dynamic(
  () => import('./components/MainMasterSlider'),
  {
    loading: () => <LoadingComponent />,
    ssr: false,
  },
)

const MainSalonsSlider = dynamic(
  () => import('./components/MainSalonsSlider'),
  {
    loading: () => <LoadingComponent />,
    ssr: false,
  },
)

const MainBrandsSlider = dynamic(
  () => import('./components/MainBrandsSlider'),
  {
    loading: () => <LoadingComponent />,
    ssr: false,
  },
)

const About = dynamic(() => import('./components/About'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

const Ribbon = dynamic(() => import('./components/Ribbon'), {
  loading: () => <LoadingComponent />,
  ssr: false,
})

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
  beautyCategories: IBeautyCategories[]
  beautyAllContent: IFeed[]
  bannerHooks: IBannerHook[]
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
  const { query } = useRouter()
  const isSearch =
    typeof query['search'] === 'string' &&
    query['search']?.length >= MIN_SEARCH_LENGTH

  const bannerTopLarge = bannerHooks.find(e => e.id === '1') ?? null
  const bannerTopSmallLeft = bannerHooks.find(e => e.id === '2') ?? null
  const bannerTopSmallRight = bannerHooks.find(e => e.id === '3') ?? null

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
        <MobileViewCards totalCount={totalCount} />
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
        <Suspense fallback={<div>Loading...</div>}>
          <MainAdsSlider city={cityData} />
          <MainRentSlider city={cityData} />
          <MainMasterSlider city={cityData} />
          <MainSalonsSlider city={cityData} />
          <MainBrandsSlider city={cityData} />
          <About />
          <Ribbon
            title="Бьюти-лента"
            beautyCategories={beautyCategories}
            beautyAllContent={beautyAllContent}
          />
        </Suspense>
      </>
    </MainLayout>
  )
}

export default MainPage
