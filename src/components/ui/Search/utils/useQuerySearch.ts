import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { searchablePathnames } from './'
import { ICity } from 'src/types'

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

  const isSearchablePath = useMemo(
    () => searchablePathnames.includes(pathname) || pathname === '/[city]',
    [pathname],
  )
  const updateSearchParam = (search: string) => {
    replace({ pathname, query: { ...query, search } }, undefined, {
      shallow: true,
    })
  }

  const redirectToMainPathSearch = (search: string) => {
    push({ pathname: mainPath, query: { ...query, search } }, undefined, {
      shallow: true,
    })
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
