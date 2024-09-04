import React, { useState, FC, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { WrapperItemsSalons, Title, SalonCardWrapper } from './styled'
import SalonCard from '../../../../blocks/SalonCard'
import Button from '../../../../ui/Button'
import FilterSearchResults, {
  IFiltersType,
  ISortOrder,
  filtersType,
} from '../../../../blocks/FilterSearchResults'
import { pluralize } from '../../../../../utils/pluralize'
import SalonMap from '../../../Salon/SalonMap'
import RentFilter, { IFilters } from '../../../Rent/RentFilter'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'
import { useRouter } from 'next/router'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { ISetState } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { IView } from 'src/components/pages/Salon/AllSalons'
import { ICity, IPagination } from 'src/types'
import { getSalonsThroughCity } from 'src/api/graphql/salon/queries/getSalonsThroughCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { settingsConfig } from 'src/api/authConfig'
import { getRating } from 'src/utils/newUtils/getRating'

export interface ISearchResults {
  pagination: IPagination | null
  cityData: ICity
}

interface Props extends ISearchResults {
  view: IView
  setView: ISetState<IView>
  salonData: ISalon[]
  main?: boolean
  rent?: boolean
}

const SalonsSearchResults: FC<Props> = ({
  salonData,
  view,
  setView,
  main = false,
  rent = false,
  pagination,
  cityData,
}) => {
  const [updateSalonData, setUpdateSalonData] = useState<ISalon[]>(salonData)
  const [page, setPage] = useState<number>(2)
  const hasNextPage = pagination && pagination.pageCount + 1 !== page
  const [filters, setFilters] = useState<IFilters | null>(null)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const { city } = useAuthStore(getStoreData)
  const totalCount = pagination?.total || 0
  const router = useRouter()

  console.log('salonData', salonData)

  useEffect(() => {
    setUpdateSalonData(salonData)
  }, [salonData])

  let storageSort
  if (typeof window !== 'undefined') {
    storageSort =
      localStorage.getItem(
        rent ? settingsConfig.rentSort : settingsConfig.salonSort,
      ) || 'viewsCount:desc'
    const storageSortProperty = storageSort.includes(filtersType['по отзывам'])
      ? 'по отзывам'
      : 'по рейтингу'

    const storageSortOrder = storageSort.includes(':desc') ? ':desc' : ':asc'

    useEffect(() => {
      setSortOrder(storageSortOrder)
      setSortProperty(storageSortProperty)
    }, [])
  }

  const [sortProperty, setSortProperty] = useState<IFiltersType>(
    Object.keys(filtersType)[1] as IFiltersType,
  )
  const [sortOrder, setSortOrder] = useState<ISortOrder>(':desc')

  const [refetch, { loading }] = useLazyQuery(getSalonsThroughCity, {
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      const prepareData: ISalon[] = flattenStrapiResponse(data.salons)
      console.log(prepareData)

      const newSalons = prepareData.map(e => {
        const reviewsCount = e.reviews.length
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      })
      setUpdateSalonData(prev => prev.concat(newSalons))
    },
  })

  const onFetchMore = async () => {
    const sort = filtersType[sortProperty] + sortOrder

    await refetch({
      variables: { slug: cityData?.slug, page, sort, pageSize: 9 },
    })
    setPage(page + 1)
  }

  const handleFilter = async (filter: keyof typeof filtersType) => {
    if (sortProperty !== filter) {
      setSortProperty(filter)
      setSortOrder(':asc')
    } else {
      setSortOrder(prev => (prev === ':asc' ? ':desc' : ':asc'))
    }
    const sort = filtersType[filter] + sortOrder
    localStorage.setItem(
      rent ? settingsConfig.rentSort : settingsConfig.salonSort,
      sort,
    )
    setUpdateSalonData([])
    setPage(2)
    await refetch({ variables: { slug: cityData?.slug, sort: [sort] } })
  }

  return (
    <>
      <div id="result">
        {view === 'list' ? (
          <>
            {!rent ? (
              <Title>
                {pluralize(totalCount, 'Найден', 'Найдено', 'Найдено')}
                &nbsp;
                {totalCount}
                &nbsp;
                {pluralize(totalCount, 'салон', 'салона', 'салонов')}
              </Title>
            ) : (
              <Title>{`Аренда кабинета, рабочего места в салонах красоты в городе ${
                cityData.name
              }: ${totalCount} ${pluralize(
                totalCount,
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
              handleFilter={handleFilter}
              sortProperty={sortProperty}
              sortOrder={sortOrder}
              salon
              view={view}
              setView={setView}
            />
            <WrapperItemsSalons>
              {updateSalonData &&
                !!updateSalonData.length &&
                updateSalonData.map(salon => (
                  <li
                    key={salon.id}
                    onClick={() =>
                      router.push(
                        rent
                          ? `/${salon.city.slug || city.slug}/rent/${salon.id}`
                          : `/${salon.city.slug || city.slug}/salon/${
                              salon.id
                            }`,
                      )
                    }
                  >
                    <SalonCardWrapper id={salon.id.toString()}>
                      <SalonCard
                        seatCount={salon.workplacesCount}
                        rent={rent}
                        loading={loading}
                        item={salon}
                        shareLink={`https://moi.salon/${
                          salon.city.name || city.slug
                        }/salon/${salon.id}`}
                      />
                    </SalonCardWrapper>
                  </li>
                ))}
            </WrapperItemsSalons>
            {hasNextPage ? (
              <>
                <MobileHidden>
                  <Button
                    onClick={onFetchMore}
                    size="medium"
                    variant="darkTransparent"
                    mb="55"
                    disabled={loading}
                  >
                    Показать еще
                  </Button>
                </MobileHidden>
                <MobileVisible>
                  <Button
                    size="roundSmall"
                    variant="withRoundBorder"
                    font="roundSmall"
                    mb="56"
                    onClick={onFetchMore}
                    disabled={loading}
                  >
                    Показать еще салоны
                  </Button>
                </MobileVisible>
              </>
            ) : null}
          </>
        ) : (
          <SalonMap
            salonData={salonData}
            pagination={pagination}
            cityData={cityData}
            rent={rent}
            view={view}
            setView={setView}
          />
        )}
      </div>
    </>
  )
}

export default SalonsSearchResults
