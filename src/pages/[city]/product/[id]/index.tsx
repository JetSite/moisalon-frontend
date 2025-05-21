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

type Props = IProductPageProps

const Product: NextPage<Props> = ({ product, reviews, cart }) => {
  return (
    <MainLayout>
      <SearchBlock />
      <ProductPage product={product} reviews={reviews} cart={cart} />
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

  if (!normalisedProduct) {
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      product: normalisedProduct,
      reviews: normalisedReviews,
      cart,
      meta: {
        title: normalisedProduct.name || 'Товар | MOI salon',
        description:
          normalisedProduct.shortDescription || 'Товар на платформе MOI salon',
        image:
          process.env.NEXT_PUBLIC_PHOTO_URL +
            normalisedProduct.gallery?.[0]?.url || '/mobile-main-bg.jpg',
        url: `https://moi.salon/${ctx.params?.['city']}/product/${normalisedProduct.id}`,
      },
      schema: {
        type: 'Product',
        data: {
          name: normalisedProduct.name,
          description: normalisedProduct.shortDescription,
          image: normalisedProduct.gallery
            ?.map(photo =>
              photo.url
                ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${photo.url}`
                : undefined,
            )
            .filter(Boolean) || ['https://moi.salon/mobile-main-bg.jpg'],
          url: `https://moi.salon/${ctx.params?.['city']}/product/${normalisedProduct.id}`,
          brand: normalisedProduct.brand
            ? {
                '@type': 'Brand',
                name: normalisedProduct.brand.name,
                url: `https://moi.salon/${ctx.params?.['city']}/brand/${normalisedProduct.brand.id}`,
              }
            : undefined,
          offers: {
            '@type': 'Offer',
            price:
              normalisedProduct.regularPrice ||
              normalisedProduct.salePrice ||
              0,
            availability: normalisedProduct.availableInStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'MOI salon',
              url: 'https://moi.salon',
            },
          },
        },
      },
    },
  })
}

export default Product
