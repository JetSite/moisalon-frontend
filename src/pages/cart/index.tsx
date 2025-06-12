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
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { initializeApollo } from 'src/api/apollo-client'

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
  // Check if user is logged in
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)

  if (accessToken) {
    // User is logged in - get their cart from server
    const result = await getServerUser(ctx)

    if ('redirect' in result) {
      return {
        redirect: result.redirect,
      }
    }

    const { user, apolloClient } = result as IGetServerUserSuccess
    const id: IID | null = ((user.data as StrapiDataObject) || null)?.id

    if (id) {
      const data = await Promise.allSettled([
        apolloClient.query({ query: GET_CART_BY_USER, variables: { id } }),
      ])

      const cart: ICart | null =
        data[0].status === 'fulfilled'
          ? (flattenStrapiResponse(data[0].value.data.carts) as ICart[])[0] ||
            null
          : null

      return addApolloState(apolloClient, {
        props: {
          data: cart,
        },
      })
    }
  }

  // User is not logged in - they will use guest cart from localStorage
  // Initialize Apollo client for potential future operations
  const apolloClient = initializeApollo({ accessToken })

  return addApolloState(apolloClient, {
    props: {
      data: null, // Guest cart will be handled on client side
    },
  })
}

export default CartPage
