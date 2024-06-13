import { useState, useCallback, useEffect } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import { MobileHidden } from '../../../styles/common'
import MobileViewCards from '../../pages/MainPage/components/MobileViewCards'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import {
  Wrapper,
  Content,
  FiltersWrap,
  ProductsWrap,
  Title,
  Change,
  ChangeTitle,
  Item,
  Text,
  GoodsWrap,
  WrapButton,
} from './styles'
import Filters from './components/Filters'
import ProductCard from '../../pages/CatalogB2cPage/components/ProductCard'
import Button from '../../ui/Button'
import { useMutation, useQuery } from '@apollo/client'
import { goodSearch } from '../../../_graphql-legacy/goodSearch'
import { useRouter } from 'next/router'
import { getB2cCart } from '../../../_graphql-legacy/cart/getB2cCart'
import { addToCartB2cMutation } from '../../../_graphql-legacy/cart/addToB2cCart'
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import { cyrToTranslit } from '../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const CatalogB2cPageAll = ({
  productCategories,
  brandSearchData,
  goods,
  totalSalons,
  totalBrands,
  totalMasters,
  noFilters,
}) => {
  const router = useRouter()
  const { setProducts: setProductsState } = useBaseStore(getStoreEvent)
  const { city } = useAuthStore(getStoreData)
  const [goodsData, setGoodsData] = useState(goods)
  const [customQuery, setCustomQuery] = useState(
    router?.query?.type === 'query' ? router?.query?.query : '',
  )

  const [filterProduct, setFilterProduct] = useState(
    router?.query?.type === 'product'
      ? [{ id: router?.query?.id, title: router?.query?.title }]
      : [],
  )
  const [filterBrand, setFilterBrand] = useState(
    router?.query?.type === 'brand'
      ? [{ id: router?.query?.id, title: router?.query?.title }]
      : [],
  )
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firstLoading, setFirstLoading] = useState(false)

  const { refetch, fetchMore } = useQuery(goodSearch, {
    variables: {
      input: {
        query: customQuery,
      },
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setLoading(false)
      setGoodsData(res.goodsSearch)
    },
    onError: () => {
      setLoading(false)
    },
  })

  const {
    data: dataCart,
    refetch: refetchCart,
    loading: loadingCart,
  } = useQuery(getB2cCart, {
    onCompleted: res => {
      setProductsState(res?.getCart?.contents || [])
    },
  })

  const [addToCart] = useMutation(addToCartB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      refetchCart()
    },
  })

  const add = (item, quantity) => {
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: false,
        },
      },
    })
  }

  const deleteItem = item => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: false,
        },
      },
    })
  }

  const cart = dataCart?.getCart?.contents || []

  useEffect(() => {
    if (firstLoading) {
      setLoading(true)
      refetch({
        input: {
          query: customQuery,
          brandId: filterBrand.map(item => item.id),
          categoryId: filterProduct.map(item => item.id),
        },
      })
    } else {
      setFirstLoading(true)
    }
  }, [filterProduct, filterBrand])

  useEffect(() => {
    setFirstLoading(false)
    setFilterProduct([])
    setFilterBrand([])
    setGoodsData(goods)
    setCustomQuery(router?.query?.type === 'query' ? router?.query?.query : '')
  }, [goods])

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        cursor: goodsData?.connection?.pageInfo?.endCursor,
        input: {
          brandId: filterBrand.map(item => item.id),
          categoryId: filterProduct.map(item => item.id),
          query: customQuery,
        },
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.goodsSearch.connection.nodes
        setFetchMoreLoading(false)
        setGoodsData({
          connection: {
            ...fetchMoreResult.goodsSearch.connection,
            nodes: [...goodsData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.goodsSearch.filterDefinition,
        })
      },
    })
  })

  return (
    <MainLayout>
      <MobileViewCards
        totalSalons={totalSalons}
        totalBrands={totalBrands}
        totalMasters={totalMasters}
      />
      <MobileHidden>
        <SearchBlock title="Найти товар" noFilters={noFilters} />
      </MobileHidden>
      <Wrapper>
        <BackButton
          type="Магазин"
          onlyType
          link={`/${city.slug}/beautyFreeShop`}
        />
        <Content>
          <FiltersWrap>
            <Filters
              productCategories={productCategories}
              brandSearchData={brandSearchData}
              setFilterProduct={setFilterProduct}
              filterProduct={filterProduct}
              setFilterBrand={setFilterBrand}
              setCustomQuery={setCustomQuery}
              filterBrand={filterBrand}
            />
          </FiltersWrap>
          <ProductsWrap>
            <Title>Все товары</Title>
            {filterProduct.length || filterBrand.length ? (
              <Change>
                <ChangeTitle>Вы выбрали: </ChangeTitle>
                {filterProduct.map(item => (
                  <Item
                    onClick={() => {
                      const arr = filterProduct.filter(el => el.id !== item.id)
                      setFilterProduct(arr)
                      setCustomQuery('')
                    }}
                  >
                    {item.title} {`[X]`}
                  </Item>
                ))}{' '}
                {filterBrand.map(item => (
                  <Item
                    onClick={() => {
                      const arr = filterBrand.filter(el => el.id !== item.id)
                      setFilterBrand(arr)
                      setCustomQuery('')
                    }}
                  >
                    {item.title} {`[X]`}
                  </Item>
                ))}{' '}
              </Change>
            ) : null}
            {goodsData?.connection?.nodes?.length ? (
              <GoodsWrap>
                {goodsData?.connection?.nodes.map(item => (
                  <ProductCard
                    add={add}
                    cart={cart}
                    loadingCart={loadingCart}
                    deleteItem={deleteItem}
                    item={item}
                    loading={loading}
                    key={item.id}
                  />
                ))}
              </GoodsWrap>
            ) : (
              <Text>Товары не найдены</Text>
            )}
            {goodsData?.connection?.pageInfo?.hasNextPage ? (
              <WrapButton>
                <Button
                  onClick={onFetchMore}
                  size="fullWidth"
                  variant="withBorder"
                  disabled={fetchMoreLoading}
                >
                  Показать еще
                </Button>
              </WrapButton>
            ) : null}
          </ProductsWrap>
        </Content>
      </Wrapper>
    </MainLayout>
  )
}

export default CatalogB2cPageAll
