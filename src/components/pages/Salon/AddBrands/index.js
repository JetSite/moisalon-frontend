import { useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { BrandsContent, Title, ListWrapper } from './styled'
import Button from '../../../ui/Button'
import Search from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/components/Search'
import SearchResults from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/components/SearchResults'
import { brandSearchQuery } from '../../../../_graphql-legacy/search/brandSearch'
import {
  BrandItemWrapper,
  Published,
} from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/styles'
import BrandItem from '../../../blocks/Cabinet/components/CabinetProfiles/components/BrandsList/BrandItem'
import { addSalonBrandsMutation } from '../../../../_graphql-legacy/salon/addSalonBrandsMutation'
import { removeSalonBrandsMutation } from '../../../../_graphql-legacy/salon/removeSalonBrandsMutation'
import { brandsSalon } from '../../../../_graphql-legacy/salon/brandsSalon'

const AddBrands = ({ salonId, refetchBrands }) => {
  const query = { query: '' } //TODO: query

  const [addBrands] = useMutation(addSalonBrandsMutation, {
    onCompleted: () => {
      refetchBrands()
    },
  })
  const [removeBrands] = useMutation(removeSalonBrandsMutation, {
    onCompleted: () => {
      refetchBrands()
    },
  })

  const { data, fetchMore } = useQuery(brandSearchQuery, {
    variables: {
      query: (query && query.query) || '',
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const { data: dataSalonBrands } = useQuery(brandsSalon, {
    variables: { id: salonId },
    fetchPolicy: 'network-only',
  })

  const dataSearch = (dataSalonBrands && dataSalonBrands.brandsSalon) || []

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
            salonId,
          },
        })
      } else {
        removeBrands({
          variables: {
            ids: [id],
            salonId,
          },
        })
      }
    },
    [addBrands, removeBrands, salonId],
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
