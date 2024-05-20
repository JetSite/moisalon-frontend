import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import Header from '../../Catalog/components/CatalogProductsPage/components/Header'
import { laptopBreakpoint } from '../../../styles/variables'
import FilterCatalog from '../../ui/FilterCatalog'
import BackButton from '../../ui/BackButton'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 0px;
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

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 23px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    margin-bottom: 0;
    text-transform: uppercase;
    text-align: center;
  }
`

const CatalogProductsSkeleton = ({
  productCategories,
  setFilter,
  selectedProduct,
  setSelectedProduct,
  filter,
  brand,
}) => {
  const { city, me } = useAuthStore(getStoreData)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length
  return (
    <>
      <Wrapper>
        <BackButton
          type="Магазин"
          name={brand.name}
          link={`/${city.citySlug}/beautyFreeShop`}
        />
        <Header brand={brand} />
        <Title>Вся продукция</Title>
        <FilterCatalog
          productCategories={productCategories}
          variant="black"
          type="product"
          setFilterProduct={setFilter}
          selectedProduct={selectedProduct}
          filterProduct={filter}
          setSelectedProduct={setSelectedProduct}
        />
      </Wrapper>
      <Wrapper>
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
    </>
  )
}

export default CatalogProductsSkeleton
