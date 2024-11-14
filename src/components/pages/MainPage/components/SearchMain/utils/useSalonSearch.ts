import { useState, useEffect, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { getSalonsThroughCity } from 'src/api/graphql/salon/queries/getSalonsThroughCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity, IPagination } from 'src/types'
import { ISalon } from 'src/types/salon'
import {
  IFiltersType,
  ISortOrder,
  filtersType,
} from 'src/components/blocks/FilterSearchResults'
import { settingsConfig } from 'src/api/authConfig'
import { GET_RENT_SALONS } from 'src/api/graphql/salon/queries/getRentSalons'

interface IUseSalonSearchParams {
  salonData: ISalon[]
  pagination: IPagination
  cityData: ICity
  rent: boolean
  pageSize: number
}

export interface IUseSalonSearchResult {
  updateSalonData: ISalon[]
  loading: boolean
  onFetchMore: () => Promise<void>
  handleFilter: (filter: IFiltersType) => Promise<void>
  sortProperty: IFiltersType
  sortOrder: ISortOrder
  setSortProperty: React.Dispatch<React.SetStateAction<IFiltersType>>
  setSortOrder: React.Dispatch<React.SetStateAction<ISortOrder>>
  nextPageCount: number
}

type IUseSalonSearch = (props: IUseSalonSearchParams) => IUseSalonSearchResult

export const useSalonSearch: IUseSalonSearch = ({
  salonData,
  pagination,
  cityData,
  rent,
  pageSize,
}) => {
  const [updateSalonData, setUpdateSalonData] = useState<ISalon[]>(salonData)
  const [nextPageCount, setNextPageCount] = useState<number>(2)
  const [sortProperty, setSortProperty] = useState<IFiltersType>('по рейтингу')
  const [sortOrder, setSortOrder] = useState<ISortOrder>(':asc')

  const [refetch, { loading }] = useLazyQuery(
    rent ? GET_RENT_SALONS : getSalonsThroughCity,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: data => {
        const newSalons = flattenStrapiResponse(data.salons)
        setUpdateSalonData(prev => prev.concat(newSalons))
      },
    },
  )

  useEffect(() => {
    setUpdateSalonData(salonData)
  }, [salonData])

  const onFetchMore = useCallback(async () => {
    const sort = filtersType[sortProperty] + sortOrder
    await refetch({
      variables: {
        slug: cityData?.slug,
        page: nextPageCount,
        sort,
        pageSize,
      },
    })

    if (pagination.pageCount + 1 !== nextPageCount) {
      setNextPageCount(prev => prev + 1)
    }
  }, [nextPageCount, sortProperty, sortOrder, cityData?.slug, refetch])

  const handleFilter = useCallback(
    async (filter: IFiltersType) => {
      let currentSortOrder: ISortOrder | null = null

      if (sortProperty !== filter) {
        currentSortOrder = ':asc'
        setSortProperty(filter)
        setSortOrder(currentSortOrder)
      } else {
        currentSortOrder = sortOrder === ':asc' ? ':desc' : ':asc'
        setSortOrder(currentSortOrder)
      }

      const sort = filtersType[filter] + currentSortOrder
      localStorage.setItem(
        rent ? settingsConfig.rentSort : settingsConfig.salonSort,
        sort,
      )
      setUpdateSalonData([])
      setNextPageCount(2)
      await refetch({
        variables: { slug: cityData?.slug, sort: [sort], pageSize },
      })
    },
    [sortOrder, cityData?.slug, refetch, sortProperty],
  )

  return {
    updateSalonData,
    loading,
    onFetchMore,
    handleFilter,
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
    nextPageCount, // Возвращаем состояние nextPageCount
  }
}
