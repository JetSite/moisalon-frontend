import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { getCart } from '../../../../../_graphql-legacy/cart/getCart'
import { goodSearch } from '../../../../../_graphql-legacy/goodSearch'
import Catalog from '../..'
import { Wrapper, NoProducts, Title } from './styles'
import FilterCatalog from '../../../../ui/FilterCatalog'
import BackButton from '../../../../ui/BackButton'
import Header from './components/Header'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const CatalogProductsPage = ({
  catalog,
  brand,
  productCategoriesData,
  goodsData,
}) => {
  const router = useRouter()
  const { me, city } = useAuthStore(getStoreData)
  const { setProducts: setProductsState } = useBaseStore(getStoreEvent)

  const [goods, setGoods] = useState(goodsData)
  const [refetchLoading, setRefetchLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length

  const [filter, setFilter] = useState({
    value: router.query.value,
    label: router.query.label,
  })

  const [selectedProduct, setSelectedProduct] = useState('Все категории')

  // const { fetchMore, refetch } = useQuery(goodsCatalogQuery, {
  //   variables: {
  //     category: brand.name,
  //     categoryId:
  //       !filter?.value || filter?.value === "Все категории"
  //         ? null
  //         : filter?.value,
  //     first: 12,
  //   },
  //   context: { clientName: "goods" },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: (res) => {
  //     if (res) {
  //       setRefetchLoading(false);
  //       setGoodsData(res);
  //     }
  //   },
  // });

  const { fetchMore, refetch } = useQuery(goodSearch, {
    variables: {
      input: {
        brandId: [brand.id],
        query: '',
        isB2b: true,
        categoryId:
          !filter?.value || filter?.value === 'Все категории'
            ? null
            : [filter?.value],
      },
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      if (res) {
        setRefetchLoading(false)
        setGoods(res.goodsSearch)
      }
    },
  })

  useEffect(() => {
    if (!filter?.value || filter?.value === 'Все категории') {
      setGoods(goods)
    } else {
      setRefetchLoading(true)
      refetch()
    }
  }, [filter])

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getCart, {
    onCompleted: res => {
      setProductsState(res?.getCartB2b?.contents || [])
    },
  })

  const cart = dataCart?.getCartB2b?.contents || []

  const loadMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        cursor: goods?.connection?.pageInfo?.endCursor,
        input: {
          query: '',
          brandId: [brand.id],
          isB2b: true,
          // categoryId:
          //   !filter?.value || filter?.value === "Все категории"
          //     ? null
          //     : [filter?.value],
        },
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult?.goodsSearch?.connection?.nodes
        setFetchMoreLoading(false)
        setGoods({
          connection: {
            ...fetchMoreResult?.goodsSearch?.connection,
            nodes: [...goods.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult?.goodsSearch?.filterDefinition,
        })
      },
    })
  })

  const renderGoods = goods?.connection?.nodes

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
      <Wrapper>
        <BackButton
          type="Магазин"
          name={brand.name}
          link={`/${city.citySlug}/beautyFreeShop`}
        />
        <Header brand={brand} />
        <Title>Вся продукция</Title>
        <FilterCatalog
          productCategories={productCategoriesData}
          variant="black"
          type="product"
          setFilterProduct={setFilter}
          filterProduct={filter}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </Wrapper>
      {renderGoods.length ? (
        <Catalog
          cart={cart}
          products={renderGoods}
          hasNextPage={goodsData?.connection?.pageInfo?.hasNextPage}
          fetchMore={loadMore}
          refetchCart={refetchCart}
          loading={fetchMoreLoading}
          loadingCart={loadingCart}
          refetchLoading={refetchLoading}
          noTitle
          me={me}
          catalog={catalog}
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

export default CatalogProductsPage
