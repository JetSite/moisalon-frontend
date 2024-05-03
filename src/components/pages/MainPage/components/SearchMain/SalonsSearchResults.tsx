import React, {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { WrapperItemsSalons, Title, SalonCardWrapper } from './styled'
import SalonCard from '../../../../blocks/SalonCard'
import Button from '../../../../ui/Button'
import FilterSearchResults, {
  typesFilter,
} from '../../../../blocks/FilterSearchResults'
import { pluralize } from '../../../../../utils/pluralize'
import SalonMap from '../../../Salon/SalonMap'
import { cyrToTranslit } from '../../../../../utils/translit'
import RentFilter from '../../../Rent/RentFilter'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

interface Props {
  me: any
  salonSearch: any
  view: string
  setView: Dispatch<SetStateAction<string>>
  main: boolean
  rent: boolean
  setFilterOpen?: Dispatch<SetStateAction<boolean>>
  filterOpen?: boolean
  cityData: string
}

const SalonsSearchResults: FC<Props> = ({
  me,
  salonSearch,
  view,
  setView,
  main = false,
  rent = false,
  setFilterOpen,
  filterOpen,
  cityData = '',
}) => {
  const query = { query: '' } //TODO: query
  const [salonSearchData, setSalonSearchData] = useState(salonSearch)
  const [loading, setLoading] = useState<boolean>(false)
  const [filters, setFilters] = useState<null | Object>(null)
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false)
  const { city } = useAuthStore(getStoreData)
  const [sortProperty, setSortProperty] = useState<
    keyof typeof typesFilter | null
  >(null)
  const [sortOrder, setSortOrder] = useState<'ASCENDING' | 'DESCENDING' | null>(
    null,
  )
  const router = useRouter()

  const isMobile = useCheckMobileDevice()

  // const { setSearchData, setChosenItemId } = useSearchHistory(
  //   salonSearchData,
  //   setSalonSearchData,
  //   'salon',
  //   isMobile ? -10 : -120,
  // )

  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }

  // const querySearch = {
  //   ...EmptySearchQuery,
  //   //@ts-ignore
  //   query: (query && query.query) || '',
  //   city: city ? city : 'Москва',
  //   lessor: rent ? true : false,
  //   sortOrder: sortOrder || null,
  //   sortProperty: sortProperty || null,
  // }

  // const { fetchMore, refetch } = useQuery(searchQuery, {
  //   variables: { input: { ...querySearch, ...filters } },
  //   notifyOnNetworkStatusChange: true,
  //   skip: true,
  //   onCompleted: res => {
  //     setLoading(false)
  //     if (res?.salonSearch) {
  //       setSalonSearchData(res.salonSearch)
  //     }
  //   },
  // })

  // useEffect(() => {
  //   if (sortProperty || querySearch?.query || filters) {
  //     setSearchData(null)
  //     setLoading(true)
  //     setChosenItemId('')
  //     refetch({
  //       variables: { input: { ...querySearch, ...filters } },
  //     })
  //   }
  // }, [querySearch?.query, querySearch?.city, filters, sortOrder, sortProperty])

  const salonsSearchResult =
    typeof window !== 'undefined' ? salonSearchData : salonSearch
  const slicedList = salonsSearchResult
  // const hasNextPage = salonSearchData?.salonsConnection?.pageInfo?.hasNextPage
  // const totalCount =
  //   typeof window !== 'undefined'
  //     ? salonSearchData?.meta?.pagination?.total
  //     : salonSearch?.meta?.pagination?.total
  const totalCount = salonSearchData?.length

  // const onFetchMore = useCallback(() => {
  //   setFetchMoreLoading(true)
  //   setChosenItemId('')
  //   fetchMore({
  //     variables: {
  //       input: { ...querySearch, ...filters },
  //       cursor: salonSearchData?.salonsConnection?.pageInfo?.endCursor,
  //     },

  //     updateQuery(previousResult, { fetchMoreResult }) {
  //       const newNodes = fetchMoreResult.salonSearch.salonsConnection.nodes

  //       setFetchMoreLoading(false)
  //       setSalonSearchData({
  //         salonsConnection: {
  //           ...fetchMoreResult.salonSearch.salonsConnection,
  //           nodes: [...salonSearchData.salonsConnection.nodes, ...newNodes],
  //         },
  //         filterDefinition: fetchMoreResult.salonSearch.filterDefinition,
  //       })
  //     },
  //   })
  // }, [filters, querySearch])

  // const fetchMoreButton = hasNextPage ? (
  //   <>
  //     <MobileHidden>
  //       <Button
  //         onClick={onFetchMore}
  //         size="medium"
  //         variant="darkTransparent"
  //         mb="55"
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще
  //       </Button>
  //     </MobileHidden>
  //     <MobileVisible>
  //       <Button
  //         size="roundSmall"
  //         variant="withRoundBorder"
  //         font="roundSmall"
  //         mb="56"
  //         onClick={onFetchMore}
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще салоны
  //       </Button>
  //     </MobileVisible>
  //   </>
  // ) : null

  return (
    <>
      <div id="result">
        {view === 'list' ? (
          <>
            {!rent ? (
              <Title>
                {pluralize(totalCount || 0, 'Найден', 'Найдено', 'Найдено')}
                &nbsp;
                {totalCount || 0}
                &nbsp;
                {pluralize(totalCount || 0, 'салон', 'салона', 'салонов')}
              </Title>
            ) : (
              <Title>{`Аренда кабинета, рабочего места в салонах красоты в городе ${cityData}: ${
                totalCount || 0
              } ${pluralize(
                totalCount || 0,
                'салон',
                'салона',
                'салонов',
              )}`}</Title>
            )}
            {!main && rent ? (
              <RentFilter
                setFilterOpen={setFilterOpen}
                filterOpen={filterOpen}
                filters={filters}
                setFilters={setFilters}
              />
            ) : null}
            <FilterSearchResults
              sortProperty={sortProperty}
              setSortProperty={setSortProperty}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              salon
              setView={setView}
            />
            <WrapperItemsSalons>
              {slicedList &&
                slicedList.map((salon: any) => (
                  <li
                    key={salon.id}
                    onClick={() =>
                      router.push(
                        rent
                          ? `/${cyrToTranslit(
                              salon.cities.cityName || city,
                            )}/rent/${salon.id}`
                          : `/${cyrToTranslit(
                              salon.cities.cityName || city,
                            )}/salon/${salon.id}`,
                      )
                    }
                  >
                    <SalonCardWrapper id={salon.id}>
                      <SalonCard
                        seatCount={salon.seatCount}
                        rent={rent}
                        loading={loading}
                        item={salon}
                        shareLink={`https://moi.salon/${cyrToTranslit(
                          salon.cities.cityName || city,
                        )}/salon/${salon.id}`}
                      />
                    </SalonCardWrapper>
                  </li>
                ))}
            </WrapperItemsSalons>
            {/* {fetchMoreButton} */}
          </>
        ) : (
          <SalonMap rent={rent} me={me} view={view} setView={setView} />
        )}
      </div>
    </>
  )
}

export default SalonsSearchResults
