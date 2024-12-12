import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IUser } from 'src/types/me'
import { ICart } from 'src/types/product'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

export interface UseFetchCartByUserResult {
  user: IUser | null
  dataCart: ICart | null
  storeCart: ICart | null
}
type UseFetchCartByUser = () => UseFetchCartByUserResult

export const useFetchCartByUser: UseFetchCartByUser = () => {
  const { user } = useAuthStore(getStoreData)
  const { setCart } = useAuthStore(getStoreEvent)
  const [dataCart, setDataCart] = useState<ICart | null>(null)

  const { data, loading, error } = useQuery(GET_CART_BY_USER, {
    variables: { id: user?.info.id },
    skip: !user?.info.id,
  })

  if (error) {
    console.error('Failed to fetch cart:', error)
  }

  useEffect(() => {
    let mounted = true
    const prepareCart: ICart | null =
      flattenStrapiResponse(data?.carts)?.[0] ?? null
    if (mounted) {
      setDataCart(prepareCart)
      prepareCart && setCart(prepareCart)
    }
    return () => {
      mounted = false
    }
  }, [data, setCart])

  return { dataCart, user, storeCart: user?.owner.cart ?? null }
}
