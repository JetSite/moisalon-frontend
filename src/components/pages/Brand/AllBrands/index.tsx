import React, { FC, useEffect, useMemo } from 'react'
import { MainContainer } from '../../../../styles/common'
import BrandsSearchResults from '../../MainPage/components/SearchMain/BrandsSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { CategoryImage, WrapBanner } from './styles'
import {
  WrapperResults,
  Title,
} from '../../MainPage/components/SearchMain/styled'
import { CSSTransition } from 'react-transition-group'
import { MobileHidden } from '../../../../styles/common'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { IBrand } from 'src/types/brands'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'
import { useSearch } from '../../MainPage/components/SearchMain/utils/useSearch'

export interface IBrandPageProps {
  brandData: IBrand[] | null
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination
}

const AllBrandsPage: FC<IBrandPageProps> = ({
  totalCount,
  brandData,
  pagination,
  cityData,
}) => {
  const router = useRouter()
  const { setLoading } = useAuthStore(getStoreEvent)
  const searchParam = router.query.search
  const searchValue = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam || ''
  const { loading, data, pagination: pagi } = useSearch(searchValue)
  const searchBrand = useMemo(() => data?.brands ?? null, [data?.brands])

  useEffect(() => {
    if (!searchValue && !brandData) {
      setLoading(true)
      router.reload()
    }
  }, [searchValue, brandData])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой бренд" />
      </MobileHidden>
      <CSSTransition in={true} timeout={500} classNames="banner" unmountOnExit>
        <WrapBanner>
          <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
          <CategoryImage />
        </WrapBanner>
      </CSSTransition>
      <MainContainer>
        <WrapperResults>
          {!loading && (brandData?.length || searchBrand) ? (
            <BrandsSearchResults
              key={brandData?.length || searchBrand?.length}
              cityData={cityData}
              pagination={
                pagination && !searchValue
                  ? pagination
                  : { ...pagi, total: searchBrand?.length ?? 0 }
              }
              brandData={data?.brands || brandData || []}
              search={!!searchValue}
            />
          ) : (
            <Title>{loading ? 'Загрузка' : 'Бренды не найдены'}</Title>
          )}
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllBrandsPage
