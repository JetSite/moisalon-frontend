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
import { Fragment } from 'react'
import MainHead from '../../../../pages/MainHead'

type Props = IProductPageProps

const Product: NextPage<Props> = ({ product, reviews, cart }) => {
  return (
    <MainLayout>
      <Fragment>
        <MainHead
          title={`${product.name} | MOI salon`}
          description={`${product.name} - ${
            product.brand?.name || 'Товар'
          } на платформе MOI salon. Описание, характеристики и отзывы.`}
          image={product.cover?.url || '/stock3.png'}
        />
        <SearchBlock />
        <ProductPage product={product} reviews={reviews} cart={cart} />
      </Fragment>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)
  const apolloClient = initializeApollo({ accessToken })

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
