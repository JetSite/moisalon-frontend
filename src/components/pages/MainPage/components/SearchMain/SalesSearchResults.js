import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { SearchMainQueryContext } from '../../../../../searchContext'
import { salesSearch } from '../../../../../_graphql-legacy/sales/salesSearch'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { WrapperItems, Title, LinkStyled } from './styled'
import Button from '../../../../ui/Button'
import { pluralize } from '../../../../../utils/pluralize'
import Sale from '../../../../blocks/Sale'

const SalesSearchResults = () => {
  const [query] = useContext(SearchMainQueryContext)
  const [salesSearchData, setSalesSearchData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

  const { fetchMore, refetch } = useQuery(salesSearch, {
    variables: {
      query: (query && query.query) || '',
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setLoading(false)
      if (res) {
        setSalesSearchData(res.salesSearch)
      }
    },
  })

  const salesSearchResult = salesSearchData?.connection.nodes || []
  const hasNextPage = salesSearchData?.connection?.pageInfo?.hasNextPage
  const totalCount = salesSearchData?.connection?.totalCount

  useEffect(() => {
    if (query?.query && query.query !== '') {
      setLoading(true)
      refetch({
        variables: {
          query: (query && query.query) || '',
          cursor: null,
        },
      })
    } else {
      setSalesSearchData(salesSearch)
    }
  }, [query])

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        query: (query && query.query) || '',
        cursor: salesSearchData?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.salesSearch.connection.nodes
        setFetchMoreLoading(false)
        setSalesSearchData({
          connection: {
            ...fetchMoreResult.salesSearch.connection,
            nodes: [...salesSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.salesSearch.filterDefinition,
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
          Показать еще акции
        </Button>
      </MobileVisible>
    </>
  ) : null

  return (
    <>
      {salesSearchResult?.length ? (
        <>
          <Title>
            {`${pluralize(
              totalCount,
              'Найдена',
              'Найдено',
              'Найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'акция',
              'акции',
              'акций',
            )}`}
          </Title>
          <WrapperItems>
            {salesSearchResult?.map(sale => (
              <Link href={`/sales/${sale?.seo?.slug || sale.id}`} key={sale.id}>
                <LinkStyled>
                  <Sale item={sale} />
                </LinkStyled>
              </Link>
            ))}
          </WrapperItems>
          {fetchMoreButton}
        </>
      ) : null}
    </>
  )
}

export default SalesSearchResults
