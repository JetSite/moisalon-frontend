import React, { useState, useEffect, FC, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainContainer } from '../../../../styles/common'
import SearchBlock from '../../../blocks/SearchBlock'
import { WrapBanner } from './styles'
import {
  WrapperResults,
  Title,
} from '../../MainPage/components/SearchMain/styled'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { MobileHidden } from '../../../../styles/common'
import Banner from './components/Banner'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { IView } from '../../Salon/AllSalons'
import { SalonsSearch } from '../../MainPage/components/SearchMain/SalonSearch'
import { useRouter } from 'next/router'
import { useSearch } from '../../MainPage/components/SearchMain/utils/useSearch'

export interface IRentsPageProps {
  rentData: ISalon[] | null
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination
  pageSize: number
}

const AllRentPage: FC<IRentsPageProps> = ({
  totalCount,
  rentData,
  pagination,
  cityData,
  pageSize,
}) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [view, setView] = useState<IView>('list')
  const [reload, setReload] = useState(false)
  const router = useRouter()
  const searchParam = router.query.search
  const searchValue = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam || ''
  const { loading, data, pagination: pagi } = useSearch(searchValue, true)
  const searchSalons = useMemo(() => data?.salons ?? null, [data?.salons])

  useEffect(() => {
    if (!searchValue && !rentData) {
      setReload(true)
      router.reload()
    }
  }, [searchValue, rentData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>

      <MobileHidden>
        {!searchValue.length ? (
          <CSSTransition
            in={view === 'list' || filterOpen}
            timeout={500}
            classNames="banner"
            unmountOnExit
          >
            <WrapBanner>
              <Banner />
            </WrapBanner>
          </CSSTransition>
        ) : null}
      </MobileHidden>
      <MainContainer>
        <WrapperResults>
          {(!loading || !reload) && (rentData?.length || searchSalons) ? (
            <SalonsSearch
              key={rentData?.length || searchSalons?.length}
              cityData={cityData}
              pagination={
                pagination && !searchValue
                  ? pagination
                  : { ...pagi, total: searchSalons?.length ?? 0 }
              }
              view={view}
              setView={!searchValue ? setView : undefined}
              salonData={data?.salons || rentData || []}
              pageSize={pageSize}
              search={!!searchValue}
              rent
            />
          ) : (
            <Title>
              {loading || reload ? 'Загрузка' : 'Салоны не найдены'}
            </Title>
          )}
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllRentPage
