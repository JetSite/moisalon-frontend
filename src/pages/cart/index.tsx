import React, { FC } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Cart, { ICartProps } from 'src/components/pages/Cart'
import { GetServerSideProps } from 'next'
import { IID, Nullable } from 'src/types/common'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { ICart } from 'src/types/product'
import {
  IGetServerUserSuccess,
  getServerUser,
} from 'src/api/utils/getServerUser'
import { addApolloState } from 'src/api/apollo-client'
import { IAppProps } from '../_app'

interface Props extends IAppProps, ICartProps {}

const CartPage: FC<Props> = ({ data }) => {
  return (
    <MainLayout>
      <Cart data={data} />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const result = await getServerUser(ctx)

  if ('redirect' in result) {
    return {
      redirect: result.redirect,
    }
  }

  const { user, apolloClient } = result as IGetServerUserSuccess

  const id: IID | null = ((user.data as StrapiDataObject) || null)?.id

  if (!id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const data = await Promise.allSettled([
    apolloClient.query({ query: GET_CART_BY_USER, variables: { id } }),
  ])

  const cart: ICart | null =
    data[0].status === 'fulfilled'
      ? (flattenStrapiResponse(data[0].value.data.carts) as ICart[])[0] || null
      : null

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      data: cart,
      user,
      meta: {
        title: 'Корзина | MOI salon',
        description: 'Ваша корзина покупок на платформе MOI salon',
        image: '/stock1.png',
        url: 'https://moi.salon/cart',
      },
      schema: {
        type: 'ItemPage',
        data: {
          name: 'Корзина | MOI salon',
          description: 'Ваша корзина покупок на платформе MOI salon',
          url: 'https://moi.salon/cart',
          image: 'https://moi.salon/stock1.png',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement:
              cart?.cartContent?.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Product',
                  name: item.product.name,
                  description: item.product.shortDescription,
                  image: item.product.cover?.url
                    ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${item.product.cover.url}`
                    : undefined,
                  offers: {
                    '@type': 'Offer',
                    price: item.product.regularPrice || item.product.salePrice,
                    priceCurrency: 'RUB',
                    availability: 'https://schema.org/InStock',
                  },
                },
              })) || [],
          },
        },
      },
    },
  })
}

export default CartPage
