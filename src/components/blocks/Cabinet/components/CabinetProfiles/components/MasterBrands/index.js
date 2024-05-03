import { useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { brandSearchQuery } from '../../../../../../../_graphql-legacy/search/brandSearch'
import Button from '../../../../../../ui/Button'
import Search from '../MasterBrands/components/Search'
import SearchResults from '../MasterBrands/components/SearchResults'
import BrandItem from '../BrandsList/BrandItem'
import { BrandsContent, OwnBrandsContent, Title } from '../BrandsList/styles'
import { BrandItemWrapper, ListWrapper, Published, Text } from './styles'
import { Logo, ItemWrapper } from '../BrandsList/styles'
import CabinetBrandsSkeleton from '../../../../../../ui/ContentSkeleton/CabinetBrandsSkeleton'
import { cyrToTranslit } from '../../../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../../../variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const MasterBrands = ({ dataSearch, handlePublish, me }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  const query = { query: '' } //TODO: query

  const {
    data,
    loading: loadingSearchBrands,
    fetchMore,
  } = useQuery(brandSearchQuery, {
    variables: {
      query: (query && query.query) || '',
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

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

  const ownBrandsList = me?.userBrands?.map(item => {
    return (
      <BrandItemWrapper
        key={item.id}
        onClick={() =>
          router.push(
            `/${cyrToTranslit(item?.addressFull?.city || city)}/brand/${
              item?.seo?.slug || item.id
            }`,
          )
        }
      >
        <ItemWrapper>
          <Logo
            src={`${PHOTO_URL}${item?.logoId}/original` || item?.photo?.url}
          />
        </ItemWrapper>
      </BrandItemWrapper>
    )
  })

  return (
    <>
      {me?.master ? (
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
          ) : !loadingSearchBrands ? (
            <>
              <ListWrapper>{brandsList}</ListWrapper>
              {fetchMoreButton}
            </>
          ) : (
            <CabinetBrandsSkeleton />
          )}
        </BrandsContent>
      ) : null}
      {me?.userBrands?.length ? (
        <OwnBrandsContent>
          <Title>Профиль: Бренды которым я управляю</Title>

          <ListWrapper>{ownBrandsList}</ListWrapper>
        </OwnBrandsContent>
      ) : null}
    </>
  )
}

export default MasterBrands
