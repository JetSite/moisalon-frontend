import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useQuery } from '@apollo/client'
import ContentFormSkeleton from '../../components/ui/ContentSkeleton/ContentFormSkeleton'
import { getCart } from '../../_graphql-legacy/cart/getCart'
import Cart from '../../components/pages/Cart'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const CartB2bPage = () => {
  const { setProducts: setProductsState } = useBaseStore(getStoreEvent)
  const { me } = useAuthStore(getStoreData)
  const {
    data: dataCart,
    loading: loadingCart,
    refetch: refetchCart,
  } = useQuery(getCart, {
    onCompleted: res => {
      setProductsState(res?.getCartB2b?.contents || [])
    },
  })
  const cart = dataCart?.getCartB2b?.contents || []
  const total = dataCart?.getCartB2b?.total

  if (loadingCart) {
    return <ContentFormSkeleton me={me} loading={false} />
  }

  return (
    <MainLayout me={me}>
      <Cart cart={cart} total={total} me={me} refetchCart={refetchCart} />
    </MainLayout>
  )
}

export default CartB2bPage
