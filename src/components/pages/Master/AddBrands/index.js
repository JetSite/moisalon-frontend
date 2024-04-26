import { useState, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { BrandsContent, Title, ListWrapper } from './styled'
import Button from '../../../ui/Button'
import Search from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/components/Search'
import SearchResults from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/components/SearchResults'
import { addUserBrandsMutation } from '../../../../_graphql-legacy/master/addUserBrandsMutation'
import { removeUserBrandsMutation } from '../../../../_graphql-legacy/master/removeUserBrandsMutation'
import { brandSearchQuery } from '../../../../_graphql-legacy/search/brandSearch'
import {
  BrandItemWrapper,
  Published,
} from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/styles'
import BrandItem from '../../../blocks/Cabinet/components/CabinetProfiles/components/BrandsList/BrandItem'
import { brandQuery } from '../../../../_graphql-legacy/master/brandQuery'

const AddBrands = ({ master, refetch }) => {
  const query = { query: '' } //TODO: query

  const [addBrands] = useMutation(addUserBrandsMutation, {
    onCompleted: () => {
      refetch()
    },
  })
  const [removeBrands] = useMutation(removeUserBrandsMutation, {
    onCompleted: () => {
      refetch()
    },
  })

  const { data, fetchMore } = useQuery(brandSearchQuery, {
    variables: {
      query: (query && query.query) || '',
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const { data: dataMasterBrands } = useQuery(brandQuery, {
    variables: { id: master?.id },
    fetchPolicy: 'network-only',
  })

  const dataSearch = (dataMasterBrands && dataMasterBrands.brandsMaster) || []

  const brandsSearchResult = data?.brandsSearch?.connection.nodes || []
  const hasNextPage = data?.brandsSearch?.connection?.pageInfo?.hasNextPage

  const onFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        query: (query && query.query) || '',
        cursor: data?.brandsSearch?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.brandsSearch.connection.nodes
        const pageInfo = fetchMoreResult.brandsSearch.connection.pageInfo

        return newNodes.length
          ? {
              ...previousResult,
              brandsSearch: {
                ...previousResult.brandsSearch,
                connection: {
                  ...previousResult.brandsSearch.connection,
                  pageInfo,
                  nodes: [
                    ...previousResult.brandsSearch.connection.nodes,
                    ...newNodes,
                  ],
                },
              },
            }
          : previousResult
      },
    })
  })
  const fetchMoreButton = hasNextPage ? (
    <Button
      onClick={onFetchMore}
      variant="withRoundBorder"
      size="roundSmall"
      font="roundMedium"
    >
      Загрузить ещё
    </Button>
  ) : null

  const handlePublish = useCallback(
    (ev, id, published) => {
      ev.preventDefault()
      if (!published) {
        addBrands({
          variables: {
            ids: [id],
            masterId: master?.id,
          },
        })
      } else {
        removeBrands({
          variables: {
            ids: [id],
            masterId: master?.id,
          },
        })
      }
    },
    [addBrands, removeBrands, master],
  )

  const brandsList = brandsSearchResult?.map(item => {
    return (
      <BrandItemWrapper
        key={item.id}
        onClick={e =>
          handlePublish(
            e,
            item.id,
            dataSearch.find(el => el.id === item.id),
          )
        }
      >
        <BrandItem brand={item} />
        <Published published={dataSearch.find(el => el.id === item.id)} />
      </BrandItemWrapper>
    )
  })

  return (
    <BrandsContent>
      <Title>Добавить бренды</Title>
      <Search />
      {query?.query?.length > 0 ? (
        <>
          <SearchResults
            slicedSearchResults={brandsSearchResult}
            dataSearch={dataSearch}
            handlePublish={handlePublish}
          />
          {fetchMoreButton}
        </>
      ) : (
        <>
          <ListWrapper>{brandsList}</ListWrapper>
          {fetchMoreButton}
        </>
      )}
    </BrandsContent>
  )
}

export default AddBrands
