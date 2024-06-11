import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import SearchBlock from '../../../components/blocks/SearchBlock'
import { laptopBreakpoint } from '../../../styles/variables'
import BrandsList from '../../Catalog/components/BrandsList'
import MobileViewCards from '../../pages/MainPage/components/MobileViewCards'
import BackButton from '../../ui/BackButton'
import Banners from '../../pages/Catalog/components/Banners'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 80px;
  margin-bottom: 80px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 70px;
  }
`

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const LinesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
  flex-wrap: wrap;
`

const SkeletonRectSmall = styled(Skeleton)`
  margin-bottom: 35px;
`

const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`

const ContentCatalogSkeleton = ({
  me,
  loading,
  setFilterProduct,
  productCategories,
  setSelectedProduct,
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
  filterProduct,
}) => {
  const { city } = useAuthStore(getStoreData)
  return (
    <MainLayout me={me} loading={loading}>
      <MobileViewCards />
      <SearchBlock />
      <Wrap>
        <BackButton onlyType type="На главную" link={`/${city.slug}`} />
      </Wrap>
      {bannersByHookWide?.bannersByHookCode?.length ||
      bannersByHookSmall1?.bannersByHookCode?.length ||
      bannersByHookSmall2?.bannersByHookCode?.length ? (
        <Banners
          bannersByHookWide={bannersByHookWide?.bannersByHookCode}
          bannersByHookSmall1={bannersByHookSmall1?.bannersByHookCode}
          bannersByHookSmall2={bannersByHookSmall2?.bannersByHookCode}
        />
      ) : null}
      <BrandsList
        setFilterProduct={setFilterProduct}
        productCategories={productCategories}
        filterProduct={filterProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <MainContainer>
        <Wrapper>
          <Title>Каталог товаров</Title>
          <LinesWrapper>
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
            <SkeletonRectSmall variant="rect" width={173} height={369} />
          </LinesWrapper>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default ContentCatalogSkeleton
