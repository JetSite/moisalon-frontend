import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { searchablePathnames } from './'
import { ICity } from 'src/types'
import { MIN_SEARCH_LENGTH } from 'src/components/pages/MainPage/components/SearchMain/utils/useSearch'

interface IUseQuerySearch {
  isSearchablePath: boolean
  updateSearchParam: (search: string) => void
  redirectToMainPathSearch: (search: string) => void
  clearSearchQuery: () => void
}

type UseQuerySearch = (city: ICity) => IUseQuerySearch

export const useQuerySearch: UseQuerySearch = city => {
  const { pathname, query, replace, push, asPath, ...router } = useRouter()
  const mainPath = `/${city.slug}`

  const getSanitizedSearch = (search: string) => search.trim().toLowerCase()

  const isSearchablePath = useMemo(
    () => searchablePathnames.includes(pathname) || pathname === '/[city]',
    [pathname],
  )
  const updateSearchParam = (search: string) => {
    const sanitizedSearch = getSanitizedSearch(search)
    replace(
      { pathname, query: { ...query, search: sanitizedSearch } },
      undefined,
      {
        shallow: true,
      },
    )
  }

  const redirectToMainPathSearch = (search: string) => {
    if (search.length < MIN_SEARCH_LENGTH) return
    const sanitizedSearch = getSanitizedSearch(search)
    push(
      { pathname: mainPath, query: { ...query, search: sanitizedSearch } },
      undefined,
      {
        shallow: true,
      },
    )
  }

  const clearSearchQuery = () => {
    const { search, ...remainingQuery } = query
    push(
      {
        pathname,
        query: remainingQuery,
      },
      undefined,
      {
        shallow: true,
      },
    )
  }

  return {
    isSearchablePath,
    updateSearchParam,
    redirectToMainPathSearch,
    clearSearchQuery,
  }
}
