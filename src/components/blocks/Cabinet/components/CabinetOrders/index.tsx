import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import Button from '../../../../ui/Button'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { NoOrders, OrdersList, Title, Wrapper } from './styles'
import Order from './components/Order'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ORDERS_BY_USER } from 'src/api/graphql/order/queries/ordersByUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import { IUser } from 'src/types/me'
import { ICart, IProductCart } from 'src/types/product'

interface Props {
  user: IUser
  cart: ICart | null
}

const CabinetOrders: FC<Props> = ({ user, cart }) => {
  useEffect(() => console.log('first'), [])
  const router = useRouter()
  const [orders, setOrders] = useState<IProductCart[]>(cart?.cartContent || [])

  console.log('cart', cart)

  const [refetch, { loading }] = useLazyQuery(ORDERS_BY_USER, {
    onCompleted: data => {
      console.log(data)

      if (data?.orders?.data?.length) {
        console.log(data)
        const ordersData: IProductCart[] =
          flattenStrapiResponse(data?.orders) || []
        // const sortedOrders = ordersData?.sort((a, b) => {
        //   return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        // })
        // setOrders(sortedOrders)
      }
    },
  })
  useEffect(() => {
    if (router.query?.tab === 'orders') {
      const orderBlock = document.getElementById('orders')
      orderBlock?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    refetch({
      variables: {
        filters: {
          user: {
            id: {
              eq: user?.info.id,
            },
          },
        },
      },
    })
  }, [router])

  console.log(user.info.id)

  return (
    <Wrapper>
      <Title>Мои заказы</Title>
      {loading && <RotatingLoader />}
      {orders?.length && !loading ? (
        <OrdersList>
          {/* {orders.map(order => (
            <Order order={order.product} />
          ))} */}
        </OrdersList>
      ) : (
        <NoOrders>Нет заказов</NoOrders>
      )}
    </Wrapper>
  )
}

export default CabinetOrders
