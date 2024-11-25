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
    props: { data: cart, user },
  })
}

export default CartPage
