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
  const { setCart } = useBaseStore(getStoreEvent)
  const { me, user } = useAuthStore(getStoreData)
  console.log('user', user)
  const {
    data: dataCart,
    loading: loadingCart,
    refetch: refetchCart,
  } = useQuery(getCart, {
    skip: true,
    onCompleted: res => {
      setProductsState(res?.getCartB2b?.contents || [])
    },
  })

  useEffect(() => {
    if (!!user?.owner?.carts?.length) {
      setCart(user.owner.carts[0])
    }
  }, [user])

  if (loadingCart) {
    return <ContentFormSkeleton me={me} loading={false} />
  }

  return (
    <MainLayout me={me}>
      <Cart me={me} refetchCart={refetchCart} />
    </MainLayout>
  )
}

export default CartPage
