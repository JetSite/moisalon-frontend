import { useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { brandSearchQuery } from '../../../../../_graphql-legacy/search/brandSearch'
import BrandItem from './BrandItem'
import Button from '../../../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { ListWrapper, ListContent } from './styles'

const List = ({ filterProduct, brandSearchData }) => {
  const [brandsSearchList, setBrandsSearchList] = useState(brandSearchData)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

  const { fetchMore, refetch } = useQuery(brandSearchQuery, {
    variables: {
      query: '',
      categoryId:
        filterProduct?.value !== 'Все категории' ? filterProduct?.value : null,
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      if (res) {
        setBrandsSearchList(res.brandsSearch)
      }
    },
  })

  useEffect(() => {
    if (filterProduct?.value && filterProduct?.value !== 'Все категории') {
      refetch({
        variables: {
          query: '',
          categoryId:
            filterProduct?.value !== 'Все категории'
              ? filterProduct?.value
              : null,
        },
      })
    } else {
      setBrandsSearchList(brandSearchData)
    }
  }, [filterProduct])

  const brandsSearchResult = brandsSearchList?.connection.nodes || []
  const hasNextPage = brandsSearchList?.connection?.pageInfo?.hasNextPage

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        query: '',
        categoryId:
          filterProduct?.value !== 'Все категории'
            ? filterProduct?.value
            : null,
        cursor: brandsSearchList?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.brandsSearch.connection.nodes
        setFetchMoreLoading(false)
        setBrandsSearchList({
          connection: {
            ...fetchMoreResult.brandsSearch.connection,
            nodes: [...brandsSearchList?.connection.nodes, ...newNodes],
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
          variant="withBorder"
          mt="88"
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
          mt="56"
          onClick={onFetchMore}
          disabled={fetchMoreLoading}
        >
          Показать ещё
        </Button>
      </MobileVisible>
    </>
  ) : null

  return (
    <ListContent>
      <ListWrapper>
        {brandsSearchResult?.map(brand => (
          <Link
            href={{
              pathname: `/catalogB2b/${brand.id}/product`,
              query: {
                brand: brand?.name,
              },
            }}
            key={brand.id}
          >
            <BrandItem filterProduct={filterProduct} brand={brand} />
          </Link>
        ))}
      </ListWrapper>
      {fetchMoreButton}
    </ListContent>
  )
}

export default List
