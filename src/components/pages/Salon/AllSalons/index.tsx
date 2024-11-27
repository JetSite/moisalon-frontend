import React, { FC, useEffect, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainContainer } from '../../../../styles/common'
import SearchBlock from '../../../blocks/SearchBlock'
import { CategoryImage, WrapBanner } from './styles'
import {
  Title,
  WrapperResults,
} from '../../MainPage/components/SearchMain/styled'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { MobileHidden } from '../../../../styles/common'
import { ISalon } from 'src/types/salon'
import { ITotalCount } from 'src/pages/[city]/salon'
import { ICity, IPagination } from 'src/types'
import { SalonsSearch } from '../../MainPage/components/SearchMain/SalonSearch'
import { useSearch } from '../../MainPage/components/SearchMain/utils/useSearch'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'

export type IView = 'map' | 'list'

export interface ISalonsPageProps {
  salonData: ISalon[] | null
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination
  pageSize: number
}

const AllSalonsPage: FC<ISalonsPageProps> = ({
  totalCount,
  salonData,
  pagination,
  cityData,
  pageSize,
}) => {
  const [view, setView] = useState<IView>('list')
  const router = useRouter()
  const { setLoading } = useAuthStore(getStoreEvent)
  const searchParam = router.query.search
  const searchValue = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam || ''
  const { loading, data, pagination: pagi } = useSearch(searchValue, false)
  const searchSalons = useMemo(() => data?.salons ?? null, [data?.salons])

  useEffect(() => {
    if (!searchValue && !salonData) {
      setLoading(true)
      router.reload()
    }
  }, [searchValue, salonData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти свой салон" />
      </MobileHidden>

      <CSSTransition
        in={view === 'list'}
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
          {!loading && (salonData?.length || searchSalons) ? (
            <SalonsSearch
              key={salonData?.length || searchSalons?.length}
              cityData={cityData}
              pagination={
                pagination && !searchValue
                  ? pagination
                  : { ...pagi, total: searchSalons?.length ?? 0 }
              }
              view={view}
              setView={!searchValue ? setView : undefined}
              salonData={data?.salons || salonData || []}
              pageSize={pageSize}
              search={!!searchValue}
            />
          ) : (
            <Title>{loading ? 'Загрузка' : 'Салоны не найдены'}</Title>
          )}
        </WrapperResults>
      </MainContainer>
    </>
  )
}

export default AllSalonsPage
