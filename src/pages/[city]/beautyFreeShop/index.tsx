import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { PRODUCT_CATEGORIES } from 'src/api/graphql/product/queries/getProductCategories'
import BeautyFreeShopPage, {
  IBeautyFreeShopPageProps,
} from 'src/components/pages/BeautyFreeShop'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { BRANDS_TO_SHOP } from 'src/api/graphql/brand/queries/getBrandToShop'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import { ICart, IProduct, IProductCategories } from 'src/types/product'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { IBrand } from 'src/types/brands'

interface Props extends IBeautyFreeShopPageProps {}

const BeautyFreeShop: NextPage<Props> = props => {
  return (
    <MainLayout>
      <MainContainer>
        <BeautyFreeShopPage {...props} />
      </MainContainer>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)

  const apolloClient = initializeApollo({ accessToken })
  const pageSize = 2

  const resArr = [
    apolloClient.query({
      query: PRODUCTS,
      variables: { pageSize },
    }),
    apolloClient.query({
      query: PRODUCT_CATEGORIES,
      variables: { itemsCount: 10, isAvailableInStock: 0 },
    }),
    apolloClient.query({
      query: BRANDS_TO_SHOP,
      variables: { itemsCount: 10 },
    }),
  ]

  if (accessToken) {
    const meData = await apolloClient.query({
      query: ME,
    })
    const id = meData.data?.me.id || null

    if (id) {
      resArr.push(
        apolloClient.query({ query: GET_CART_BY_USER, variables: { id } }),
      )
    }
  }

  const data = await Promise.allSettled(resArr)

  const products = getPrepareData<IProduct[]>(data[0], 'products')

  const productCategories = getPrepareData<IProductCategories[]>(
    data[1],
    'productCategories',
  )

  const brands = getPrepareData<IBrand[]>(data[2], 'brands')
  const cartQueryResult = accessToken ? data[3] : null
  const cart = cartQueryResult
    ? getPrepareData<ICart[]>(cartQueryResult, 'carts')?.[0] ?? null
    : null

  return addApolloState(apolloClient, {
    props: {
      brands,
      dataProducts: products,
      dataProductCategories: productCategories,
      cityData: 'Москва',
      pageSize,
      cart,
      pagination:
        data[0].status === 'fulfilled'
          ? data[0].value.data.products?.meta.pagination
          : null,
    },
  })
}

export default BeautyFreeShop
