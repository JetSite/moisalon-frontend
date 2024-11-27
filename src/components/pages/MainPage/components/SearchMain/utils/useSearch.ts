import { useEffect, useState } from 'react'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { IPagination } from 'src/types'
import { useLazyQuery } from '@apollo/client'
import { SEARCH } from 'src/api/graphql/search'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

export const MIN_SEARCH_LENGTH = 3

export interface ISearchData {
  salons: ISalon[]
  masters: IMaster[]
  brands: IBrand[]
}

type UseSearch = (
  searchValue: string,
  rent?: boolean,
) => {
  loading: boolean
  data: ISearchData | null
  pagination: IPagination
}
export const useSearch: UseSearch = (searchValue, rent) => {
  const [data, setData] = useState<ISearchData | null>(null)
  const [loading, setLoading] = useState(false)

  const [search] = useLazyQuery(SEARCH, {
    onCompleted: data => {
      const resultSearch: ISearchData = { salons: [], masters: [], brands: [] }
      const keys = Object.keys(data.search) as Array<keyof ISearchData>
      keys.forEach(key => {
        const res = flattenStrapiResponse(data.search[key])
        if (res) {
          resultSearch[key] = res
        }
      })
      if (keys.some(key => resultSearch[key].length > 0)) setData(resultSearch)
      setLoading(false)
    },
    onError: error => {
      console.error('Search failed: ', error)
      setLoading(false)
      throw new Error('Search failed')
    },
  })

  const pagination: IPagination = {
    total: 0,
    page: 1,
    pageCount: 1,
    pageSize: 10,
  }

  useEffect(() => {
    let isActive = true
    const debounceTimeout = setTimeout(() => {
      if (!searchValue.length || searchValue.length <= MIN_SEARCH_LENGTH) {
        setData(null)
        setLoading(false)
        return
      }
      setLoading(true)
      if (isActive) {
        search({ variables: { searchValue, rent } })
      }
    }, 300)

    return () => {
      isActive = false
      clearTimeout(debounceTimeout)
    }
  }, [searchValue])

  return {
    loading,
    data,
    pagination,
  }
}
