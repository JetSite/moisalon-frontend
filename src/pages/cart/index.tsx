import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import Cart from 'src/components/pages/Cart'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { initializeApollo } from 'src/api/apollo-client'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { ProductsWrap } from 'src/components/pages/Cart/styled'
import { SkeletonCart } from 'src/components/skeletons/cart'

interface Props {}

const CartPage = () => {
  const { user } = useAuthStore(getStoreData)

  return <MainLayout>{user ? <Cart me={user} /> : <SkeletonCart />}</MainLayout>
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
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

  if (!id) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  } else {
    const userData = await apolloClient.query({
      query: USER,
      variables: { id },
    })

    // const user = flattenStrapiResponse(userData.data.usersPermissionsUser)

    return {
      props: {
        accessToken,
        user: userData.data.usersPermissionsUser,
      },
    }
  }
}

export default CartPage
