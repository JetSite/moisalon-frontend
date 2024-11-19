import React, { FC } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import Cart, { ICartProps } from 'src/components/pages/Cart'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { initializeApollo } from 'src/api/apollo-client'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICart } from 'src/types/product'

const CartPage: FC<ICartProps> = ({ data }) => {
  return (
    <MainLayout>
      <Cart data={data} />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<ICartProps>
> = async context => {
  const accessToken = getCookie(authConfig.tokenKeyName, context)
  const apolloClient = initializeApollo({ accessToken })

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  const meData = await apolloClient.query({
    query: ME,
  })
  const id = meData.data?.me.id || null

  const data = await Promise.allSettled([
    apolloClient.query({ query: GET_CART_BY_USER, variables: { id } }),
  ])

  const cart: ICart | null =
    data[0].status === 'fulfilled'
      ? (flattenStrapiResponse(data[0].value.data.carts) as ICart[])[0] || null
      : null

  return {
    props: { data: cart },
  }
}

export default CartPage
