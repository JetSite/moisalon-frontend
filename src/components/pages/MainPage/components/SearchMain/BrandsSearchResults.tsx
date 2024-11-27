import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { WrapperItemsBrands, Title, LinkStyled } from './styled'
import { pluralize } from '../../../../../utils/pluralize'
import BrandItem from '../../../../blocks/BrandCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IBrand } from 'src/types/brands'
import { ICity, IPagination } from 'src/types'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import { useLazyQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import Button from '../../../../ui/Button'
import { useRouter } from 'next/router'
import { ISearchResults } from './SalonSearch'

interface Props extends ISearchResults {
  brandData: IBrand[]
}

const BrandsSearchResults: FC<Props> = ({
  brandData,
  pagination,
  cityData,
}) => {
  const [updateBrandData, setUpdateBrandData] = useState<IBrand[]>(brandData)
  const [page, setPage] = useState<number>(2)
  const totalCount = pagination?.total || 0
  const hasNextPage = pagination && pagination.pageCount + 1 !== page
  const { city } = useAuthStore(getStoreData)
  const router = useRouter()

  const [getBrands, { loading }] = useLazyQuery(BRANDS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.brands)

      setUpdateBrandData(prev => prev.concat(prepareData))
    },
  })

  useEffect(() => {
    setUpdateBrandData(brandData)
  }, [brandData])

  const onFetchMore = async () => {
    await getBrands({ variables: { page } })
    setPage(page + 1)
  }

  return (
    <>
      {updateBrandData?.length ? (
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
            {updateBrandData?.map(brand => (
              <div
                onClick={() => {
                  console.log(brand)
                  router.push(
                    `/${brand.city.slug || city.slug}/brand/${brand.id}`,
                  )
                }}
                key={brand.id}
              >
                <LinkStyled>
                  <BrandItem
                    loading={loading}
                    brand={brand}
                    shareLink={`https://moi.salon/${
                      brand.city?.slug || city?.slug
                    }/brand/${brand.id}`}
                    type="search-page"
                  />
                </LinkStyled>
              </div>
            ))}
          </WrapperItemsBrands>
          {hasNextPage ? (
            <>
              <MobileHidden>
                <Button
                  onClick={onFetchMore}
                  size="medium"
                  variant="darkTransparent"
                  mb="55"
                  disabled={loading}
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
                  disabled={loading}
                >
                  Показать еще бренды
                </Button>
              </MobileVisible>
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default BrandsSearchResults
