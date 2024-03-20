import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import {
  CityContext,
  SearchMainQueryContext,
} from '../../../../../searchContext'
import { brandSearchQuery } from '../../../../../_graphql-legacy/search/brandSearch'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'

import { WrapperItemsBrands, Title, LinkStyled } from './styled'
import Button from '../../../../ui/Button'
import { pluralize } from '../../../../../utils/pluralize'
import BrandItem from '../../../../blocks/BrandCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { useSearchHistory } from '../../../../../hooks/useSearchHistory'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'

const BrandsSearchResults = ({ brandsSearch }) => {
  const [query] = useContext(SearchMainQueryContext)
  const [brandsSearchData, setBrandsSearchData] = useState(brandsSearch)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [city] = useContext(CityContext)

  const isMobile = useCheckMobileDevice()

  const { searchData, setSearchData, setChosenItemId } = useSearchHistory(
    brandsSearchData,
    setBrandsSearchData,
    'brand',
    isMobile ? -10 : -120,
  )

  const { fetchMore, refetch } = useQuery(brandSearchQuery, {
    variables: {
      query: (query && query.query) || '',
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setLoading(false)
      if (res) {
        setBrandsSearchData(res.brandsSearch)
      }
    },
  })

  const brandsSearchResult = brandsSearchData?.connection.nodes || []
  const hasNextPage = brandsSearchData?.connection?.pageInfo?.hasNextPage
  const totalCount = brandsSearchData?.connection?.totalCount

  useEffect(() => {
    if (query?.query && query.query !== '') {
      setSearchData(null)
      setLoading(true)
      setChosenItemId('')
      refetch({
        variables: {
          query: (query && query.query) || '',
          cursor: null,
        },
      })
    } else {
      // setBrandsSearchData(searchData ? searchData : brandsSearch);
      return
    }
  }, [query])

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    setChosenItemId('')
    fetchMore({
      variables: {
        query: (query && query.query) || '',
        cursor: brandsSearchData?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.brandsSearch.connection.nodes
        setFetchMoreLoading(false)
        setBrandsSearchData({
          connection: {
            ...fetchMoreResult.brandsSearch.connection,
            nodes: [...brandsSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.brandsSearch.filterDefinition,
        })
      },
    })
  })

  const fetchMoreButton = hasNextPage ? (
    <>
      <MobileHidden>
        <Button
          onClick={onFetchMore}
          size="medium"
          variant="darkTransparent"
          mb="55"
          disabled={fetchMoreLoading}
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
          disabled={fetchMoreLoading}
        >
          Показать еще бренды
        </Button>
      </MobileVisible>
    </>
  ) : null

  return (
    <>
      {brandsSearchResult?.length ? (
        <>
          <Title>
            {`${pluralize(
              totalCount,
              'Найден',
              'Найдено',
              'Найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'бренд',
              'бренда',
              'брендов',
            )}`}
          </Title>
          <WrapperItemsBrands>
            {brandsSearchResult?.map(brand => (
              <Link
                href={`/${cyrToTranslit(
                  brand?.addressFull?.city || city,
                )}/brand/${brand?.seo?.slug || brand.id}`}
                key={brand.id}
              >
                <LinkStyled>
                  <BrandItem
                    loading={loading}
                    brand={brand}
                    shareLink={`https://moi.salon/${cyrToTranslit(
                      brand?.addressFull?.city || city,
                    )}/brand/${brand?.seo?.slug || brand.id}`}
                    type="search-page"
                  />
                </LinkStyled>
              </Link>
            ))}
          </WrapperItemsBrands>
          {fetchMoreButton}
        </>
      ) : null}
    </>
  )
}

export default BrandsSearchResults
