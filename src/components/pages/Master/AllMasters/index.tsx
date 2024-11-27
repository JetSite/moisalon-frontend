import { MainContainer } from '../../../../styles/common'
import MastersSearchResults from '../../MainPage/components/SearchMain/MastersSearchResults'
import SearchBlock from '../../../blocks/SearchBlock'
import Line from '../../MainPage/components/Line'
import MobileViewCards from '../../MainPage/components/MobileViewCards'
import { CategoryImage, WrapBanner } from './styles'
import { FC, useEffect, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MobileHidden } from '../../../../styles/common'
import { IMaster } from 'src/types/masters'
import { ICity, IPagination } from 'src/types'
import { ITotalCount } from 'src/pages/[city]/salon'
import {
  Title,
  WrapperResults,
} from '../../MainPage/components/SearchMain/styled'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'
import { useSearch } from '../../MainPage/components/SearchMain/utils/useSearch'

export interface IMastersPageProps {
  masterData: IMaster[] | null
  totalCount: ITotalCount
  cityData: ICity
  pagination: IPagination
}

const AllMastersPage: FC<IMastersPageProps> = ({
  masterData,
  totalCount,
  cityData,
  pagination,
}) => {
  const router = useRouter()
  const { setLoading } = useAuthStore(getStoreEvent)
  const searchParam = router.query.search
  const searchValue = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam || ''
  const { loading, data, pagination: pagi } = useSearch(searchValue)
  const searchMaster = useMemo(() => data?.masters ?? null, [data?.masters])

  useEffect(() => {
    if (!searchValue && !masterData) {
      setLoading(true)
      router.reload()
    }
  }, [searchValue, masterData])

  return (
    <>
      <MobileViewCards totalCount={totalCount} />
      <MobileHidden>
        <SearchBlock title="Найти своего мастера" />
      </MobileHidden>

      <CSSTransition in={true} timeout={500} classNames="banner" unmountOnExit>
        <WrapBanner>
          <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
          <CategoryImage />
        </WrapBanner>
      </CSSTransition>
      <MainContainer>
        <WrapperResults>
          {!loading && (masterData?.length || searchMaster) ? (
            <MastersSearchResults
              key={masterData?.length || searchMaster?.length}
              cityData={cityData}
              pagination={
                pagination && !searchValue
                  ? pagination
                  : { ...pagi, total: searchMaster?.length ?? 0 }
              }
              masterData={data?.masters || masterData || []}
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

export default AllMastersPage
