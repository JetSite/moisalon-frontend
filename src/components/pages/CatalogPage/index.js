import { useState } from 'react'
import styled from 'styled-components'
import MainLayout from '../../../layouts/MainLayout'
import MobileViewCards from '../../pages/MainPage/components/MobileViewCards'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import BrandsList from '../Catalog/components/BrandsList'
import Banners from '../Catalog/components/Banners'
import Line from '../../pages/MainPage/components/Line'
import Ribbon from '../../pages/MainPage/components/Ribbon'
import { laptopBreakpoint } from '../../../styles/variables'
import { MobileHidden } from '../../../styles/common'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const CatalogPage = ({
  productCategories,
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
  brandsData,
  brandSearchData,
  beautyCategories,
  beautyAllContent,
  noFilters = false,
}) => {
  const [filterProduct, setFilterProduct] = useState(null)
  const { city } = useAuthStore(getStoreData)
  const [selectedProduct, setSelectedProduct] = useState('Все категории')

  return (
    <MainLayout>
      <MobileViewCards />
      <MobileHidden>
        <SearchBlock noFilters={noFilters} title="Найти товар" />
      </MobileHidden>
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
        setSelectedProduct={setSelectedProduct}
        filterProduct={filterProduct}
        brandsData={brandsData}
        brandSearchData={brandSearchData}
      />
      <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
      <Ribbon
        title="Бьюти-лента"
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
      />
    </MainLayout>
  )
}

export default CatalogPage
