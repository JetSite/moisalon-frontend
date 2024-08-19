import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import Cart from 'src/components/pages/Cart'

const CartPage = () => {
  const { me } = useAuthStore(getStoreData)

  return (
    <MainLayout>
      <Cart me={me} />
    </MainLayout>
  )
}

export default CartPage
