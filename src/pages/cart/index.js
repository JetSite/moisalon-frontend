import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useQuery } from '@apollo/client'
import ContentFormSkeleton from '../../components/ui/ContentSkeleton/ContentFormSkeleton'
import { getCart } from '../../_graphql-legacy/cart/getCart'
import Cart from '../../components/pages/Cart'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const CartPage = () => {
  const { me } = useAuthStore(getStoreData)

  return (
    <MainLayout me={me}>
      <Cart me={me} />
    </MainLayout>
  )
}

export default CartPage
