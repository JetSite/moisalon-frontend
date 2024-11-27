import { useEffect, useMemo, useState } from 'react'
import { searchEntity } from 'src/api/utils/searchEntity'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { IPagination } from 'src/types'

export const MIN_SEARCH_LENGTH = 3

export interface ISearchData {
  salons: ISalon[]
  masters: IMaster[]
  brands: IBrand[]
}

type UseSearch = (searchValue: string) => {
  loading: boolean
  data: ISearchData | null
  pagination: IPagination
}
export const useSearch: UseSearch = searchValue => {
  const [data, setData] = useState<ISearchData | null>(null)
  const [loading, setLoading] = useState(false)

  const pagination: IPagination = {
    total: 0,
    page: 1,
    pageCount: 1,
    pageSize: 10,
  }

  useEffect(() => {
    let isActive = true // For cleanup
    if (!searchValue.length || searchValue.length >= MIN_SEARCH_LENGTH) {
      setData(null)
      setLoading(false)
      return
    }
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await searchEntity(searchValue)
        if (res && isActive) {
          // Check if component is still mounted) {
          const haveResultSearch = !!Object.keys(res).find(key => !!key.length)
          haveResultSearch && setData(res)
        }
      } catch (error) {
        console.error('Search failed: ', error)
        throw new Error('Search failed')
      }
      setLoading(false)
    }

    fetchData()
    return () => {
      isActive = false // Cleanup
    }
  }, [searchValue])

  return {
    loading,
    data,
    pagination,
  }
}
