import {
  addApolloState,
  initializeApollo,
} from '../../../../../api/apollo-client'
import MainLayout from '../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../styles/common'
import BrandProductsPage, {
  IBrandProductsPageProps,
} from '../../../../../components/pages/Brand/BrandProducts'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { ICart, IProduct, IProductCategories } from 'src/types/product'
import { PRODUCT_CATEGORIES } from 'src/api/graphql/product/queries/getProductCategories'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface Props extends IBrandProductsPageProps {}

const BrandProducts: NextPage<Props> = props => {
  return (
    <MainLayout>
      <MainContainer>
        <BrandProductsPage {...props} />
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

  const brandID = ctx.query.id
  if (!brandID) {
    return {
      notFound: true,
    }
  }

  const queries = [
    apolloClient.query({
      query: PRODUCTS,
      variables: {
        filtersInput: { brand: { id: { eq: brandID } } },
        pageSize,
      },
    }),
    apolloClient.query({
      query: PRODUCT_CATEGORIES,
      variables: { itemsCount: 10, isAvailableInStock: 0 },
    }),
  ]

  const data = await Promise.allSettled(queries)

  const products = getPrepareData<IProduct[]>(data[0], 'products')
  const productCategories = getPrepareData<IProductCategories[]>(
    data[1],
    'productCategories',
  )

  const id = accessToken
    ? (await apolloClient.query({ query: ME })).data.me.id
    : null
  const cartData = id
    ? await apolloClient.query({
        query: GET_CART_BY_USER,
        variables: { id },
      })
    : null
  const cart = cartData
    ? (flattenStrapiResponse(cartData.data.carts) as ICart[])[0] || null
    : null

  const brand: IBrand | null = products
    ? products.find(product => product.brand.id === brandID)?.brand ?? null
    : null

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      products,
      brand,
      pageSize,
      productCategories,
      cart,
      pagination:
        data[0].status === 'fulfilled'
          ? data[0].value.data.products?.meta.pagination
          : null,
    },
  })
}

export default BrandProducts
