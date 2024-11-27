import { useEffect, useState } from 'react'
import { searchEntity } from 'src/api/utils/searchEntity'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { IPagination } from 'src/types'

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
    if (!searchValue.length) setData(null)
    setLoading(true)
    const fetchData = async () => {
      const res = await searchEntity(searchValue)
      if (res) {
        const haveResultSearch = !!Object.keys(res).find(key => !!key.length)
        haveResultSearch && setData(res)
      }
      setLoading(false)
    }

    fetchData()
  }, [searchValue])

  return {
    loading,
    data,
    pagination,
  }
}
