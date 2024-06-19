import { FC, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import Header from './components/Header'
import { Wrapper, NoProducts } from './styles'
import FilterCatalog from '../../ui/FilterCatalog'
import useCheckMobileDevice from '../../../hooks/useCheckMobileDevice'
import { getProducts } from 'src/api/graphql/product/queries/getProducts'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { GET_CART } from 'src/api/graphql/cart/queries/getCart'
import Catalog from '../Catalog'
import useBaseStore from 'src/store/baseStore'
import { IProduct } from 'src/types/product'

interface IBeautyFreeShopPageProps {
  brand: any
  me: any
  dataProducts: IProduct[]
  dataProductCategories: any
}

const BeautyFreeShopPage: FC<IBeautyFreeShopPageProps> = ({
  brand,
  me,
  dataProducts,
  dataProductCategories,
}) => {
  const { user } = useAuthStore(getStoreData)
  const { setCart } = useBaseStore(getStoreEvent)
  const [filter, setFilter] = useState(null)
  const [productsData, setProductsData] = useState(dataProducts)
  const [refetchLoading, setRefetchLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('Все категории')

  const isMobile = useCheckMobileDevice()

  const cartId = useMemo(() => user?.owner?.carts?.[0]?.id, [user])

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(GET_CART, {
    skip: !cartId,
    notifyOnNetworkStatusChange: true,
    variables: {
      id: cartId,
    },
    onCompleted: res => {
      if (res?.cart?.data) {
        setCart(flattenStrapiResponse(res.cart.data))
      }
    },
  })

  const { refetch: refectchProducts } = useQuery(getProducts, {
    skip: !filter,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      if (res?.products?.data) {
        const normalisedProducts = flattenStrapiResponse(res.products.data)
        setRefetchLoading(false)
        setProductsData(normalisedProducts)
      }
    },
  })

  useEffect(() => {
    if (!filter?.value || filter?.value === 'Все категории') {
      setProductsData(dataProducts)
    } else {
      setRefetchLoading(true)
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
      <Head>
        {brand?.seo?.title ? <title>{brand?.seo?.title}</title> : null}
        {brand?.seo?.description ? (
          <meta name="description" content={brand?.seo?.description} />
        ) : null}
        {brand?.photo?.url ? (
          <meta property="og:image" content={brand?.photo?.url} />
        ) : null}
      </Head>
      <Header me={me} brand={brand} />
      <Wrapper>
        <FilterCatalog
          productCategories={dataProductCategories}
          setFilterProduct={setFilter}
          filterProduct={filter}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </Wrapper>
      {productsData && !!productsData?.length ? (
        <Catalog
          user={user}
          refetchCart={refetchCart}
          products={productsData}
          // hasNextPage={goodsData?.connection?.pageInfo?.hasNextPage}
          // fetchMore={loadMore}
          // loading={fetchMoreLoading}
          // loadingCart={loadingCart}
          // refetchLoading={refetchLoading}
          noTitle
          me={me}
          brand={brand}
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
