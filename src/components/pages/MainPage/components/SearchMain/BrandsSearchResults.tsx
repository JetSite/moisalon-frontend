import React, {  useState } from 'react'
import Link from 'next/link'
import { WrapperItemsBrands, Title, LinkStyled } from './styled'
import { pluralize } from '../../../../../utils/pluralize'
import BrandItem from '../../../../blocks/BrandCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IBrand } from 'src/types/brands'

const BrandsSearchResults = ({ brandsSearch }: {brandsSearch: IBrand[]}) => {
  const [brandsSearchData, setBrandsSearchData] = useState(brandsSearch)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const { city } = useAuthStore(getStoreData)

  const isMobile = useCheckMobileDevice()


  // const { fetchMore, refetch } = useQuery(brandSearchQuery, {
  //   variables: {
  //     query: (query && query.query) || '',
  //   },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: res => {
  //     setLoading(false)
  //     if (res) {
  //       setBrandsSearchData(res.brandsSearch)
  //     }
  //   },
  // })

  const brandsSearchResult = brandsSearchData || []
  // const hasNextPage = brandsSearchData?.connection?.pageInfo?.hasNextPage
  // const totalCount = brandsSearchData?.connection?.totalCount

  const totalCount = brandsSearchData?.length

  // useEffect(() => {
  //   if (query?.query && query.query !== '') {
  //     setSearchData(null)
  //     setLoading(true)
  //     setChosenItemId('')
  //     refetch({
  //       variables: {
  //         query: (query && query.query) || '',
  //         cursor: null,
  //       },
  //     })
  //   } else {
  //     // setBrandsSearchData(searchData ? searchData : brandsSearch);
  //     return
  //   }
  // }, [query])

  // const onFetchMore = useCallback(() => {
  //   setFetchMoreLoading(true)
  //   setChosenItemId('')
  //   fetchMore({
  //     variables: {
  //       query: (query && query.query) || '',
  //       cursor: brandsSearchData?.connection?.pageInfo?.endCursor,
  //     },

  //     updateQuery(previousResult, { fetchMoreResult }) {
  //       const newNodes = fetchMoreResult.brandsSearch.connection.nodes
  //       setFetchMoreLoading(false)
  //       setBrandsSearchData({
  //         connection: {
  //           ...fetchMoreResult.brandsSearch.connection,
  //           nodes: [...brandsSearchData.connection.nodes, ...newNodes],
  //         },
  //         filterDefinition: fetchMoreResult.brandsSearch.filterDefinition,
  //       })
  //     },
  //   })
  // })

  // const fetchMoreButton = hasNextPage ? (
  //   <>
  //     <MobileHidden>
  //       <Button
  //         onClick={onFetchMore}
  //         size="medium"
  //         variant="darkTransparent"
  //         mb="55"
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще
  //       </Button>
  //     </MobileHidden>
  //     <MobileVisible>
  //       <Button
  //         size="roundSmall"
  //         variant="withRoundBorder"
  //         font="roundSmall"
  //         mb="56"
  //         onClick={onFetchMore}
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще бренды
  //       </Button>
  //     </MobileVisible>
  //   </>
  // ) : null

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
                  brand.city || city,
                )}/brand/${ brand.id}`}
                key={brand.id}
              >
                <LinkStyled>
                  <BrandItem
                    loading={loading}
                    brand={brand}
                    shareLink={`https://moi.salon/${cyrToTranslit(
                      brand.city || city,
                    )}/brand/${ brand.id}`}
                    type="search-page"
                  />
                </LinkStyled>
              </Link>
            ))}
          </WrapperItemsBrands>
          {/* {fetchMoreButton} */}
        </>
      ) : null}
    </>
  )
}

export default BrandsSearchResults
