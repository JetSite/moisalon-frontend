import SearchBlock from '../../../../components/blocks/SearchBlock'
import MainLayout from '../../../../layouts/MainLayout'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import { GET_PRODUCT_REVIEWS } from 'src/api/graphql/product/queries/getProductReviews'
import { PRODUCT_BY_ID } from 'src/api/graphql/product/queries/getProduct'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import ProductPage, {
  IProductPageProps,
} from 'src/components/pages/ProductPage'
import { ICart, IProduct } from 'src/types/product'
import { IReview } from 'src/types/reviews'
import { GetServerSideProps, NextPage } from 'next'
import { IID, Nullable } from 'src/types/common'
import {
  IGetServerUserSuccess,
  getServerUser,
} from 'src/api/utils/getServerUser'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { ApolloQueryResult } from '@apollo/client'

interface Props extends IProductPageProps {}

const Product: NextPage<Props> = ({ product, reviews, cart }) => {
  return (
    <MainLayout>
      <>
        <SearchBlock />
        <ProductPage product={product} reviews={reviews} cart={cart} />
      </>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)
  const apolloClient = initializeApollo({ accessToken })
  let cart: ICart | null = null

  if (accessToken) {
    const me = await apolloClient.query({
      query: ME,
    })
    const id: IID | null = me.data.me.id

    if (!id) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    const cartData = await apolloClient.query({
      query: GET_CART_BY_USER,
      variables: { id },
    })
    cart = (flattenStrapiResponse(cartData.data.carts) as ICart[])[0] || null
  }

  const product = await apolloClient.query({
    query: PRODUCT_BY_ID,
    variables: {
      id: ctx.params?.id,
    },
  })

  const reviews = await apolloClient.query({
    query: GET_PRODUCT_REVIEWS,
    variables: {
      filters: {
        product: {
          id: {
            eq: ctx.params?.id,
          },
        },
      },
    },
  })

  const normalisedProduct: IProduct | null = flattenStrapiResponse(
    product?.data?.product,
  )
  const normalisedReviews: IReview[] | null = flattenStrapiResponse(
    reviews?.data?.reviews,
  )

  return addApolloState(apolloClient, {
    props: {
      product: normalisedProduct,
      reviews: normalisedReviews,
      cart,
    },
  })
}

export default Product
