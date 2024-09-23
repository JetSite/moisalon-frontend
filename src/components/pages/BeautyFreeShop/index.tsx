import { FC, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { Wrapper, NoProducts } from './styles'
import FilterCatalog, { IFilterCatalog } from '../../ui/FilterCatalog'
import { getProducts } from 'src/api/graphql/product/queries/getProducts'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import Catalog from '../Catalog'
import { IProduct, IProductCategories } from 'src/types/product'
import { IBrand } from 'src/types/brands'
import Header from '../Brand/ViewBrand/components/Header'

export interface IBeautyFreeShopPageProps {
  brands: IBrand[]
  dataProducts: IProduct[]
  dataProductCategories: IProductCategories[]
}

const BeautyFreeShopPage: FC<IBeautyFreeShopPageProps> = ({
  brands,
  dataProducts,
  dataProductCategories,
}) => {
  const { user } = useAuthStore(getStoreData)

  const [selectBrand, setSelectBrand] = useState<IBrand | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [productsData, setProductsData] = useState<IProduct[]>(dataProducts)

  const { refetch: refectchProducts, loading: refetchLoading } = useQuery(
    getProducts,
    {
      skip: !filter,
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        if (res?.products?.data) {
          const normalisedProducts = flattenStrapiResponse(res.products.data)
          setProductsData(normalisedProducts)
        }
      },
    },
  )

  useEffect(() => {
    if (!filter?.value || filter?.value === 'Все категории') {
      setProductsData(dataProducts)
    } else {
      refectchProducts({
        filtersInput: {
          product_categories: {
            title: {
              eq: filter?.label,
            },
          },
        },
      })
    }
  }, [filter])

  return (
    <>
      {/* <Head>
        {brandData?.seo?.title ? <title>{brandData?.seo?.title}</title> : null}
        {brandData?.seo?.description ? (
          <meta name="description" content={brandData?.seo?.description} />
        ) : null}
        {brandData?.photo?.url ? (
          <meta property="og:image" content={brandData?.photo?.url} />
        ) : null}
      </Head> */}

      <Wrapper>
        <FilterCatalog
          setSelectBrand={setSelectBrand}
          brands={brands}
          setProductsData={setProductsData}
          productCategories={dataProductCategories}
          dataProducts={dataProducts}
          productsData={productsData}
          setFilterProduct={setFilter}
          filterProduct={filter}
        />
      </Wrapper>
      {productsData && !!productsData?.length ? (
        <Catalog
          user={user}
          products={productsData}
          // hasNextPage={goodsData?.connection?.pageInfo?.hasNextPage}
          // fetchMore={loadMore}
          loading={refetchLoading}
          // loadingCart={loadingCart}
          noTitle
          brandData={brands}
        />
      ) : (
        <Wrapper>
          <NoProducts>Товары не найдены</NoProducts>
        </Wrapper>
      )}
    </>
  )
}

export default BeautyFreeShopPage
