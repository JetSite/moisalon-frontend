import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '../../../../ui/Button'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { NoOrders, OrdersList, Title, Wrapper } from './styles'
import Order from './components/Order'
import { useQuery } from '@apollo/client'
import { ORDERS_BY_USER } from 'src/api/graphql/order/queries/ordersByUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IOrder } from 'src/types/orders'
import RotatingLoader from 'src/components/ui/RotatingLoader'

const CabinetOrders = () => {
  const router = useRouter()
  const { user } = useAuthStore(getStoreData)
  const [orders, setOrders] = useState<IOrder[]>([])

  const { loading } = useQuery(ORDERS_BY_USER, {
    variables: {
      filters: {
        user: {
          id: {
            eq: user?.info.id,
          },
        },
      },
    },
    onCompleted: data => {
      if (data?.orders?.data?.length) {
        const ordersData = flattenStrapiResponse(data?.orders)
        const sortedOrders = ordersData.sort((a, b) => {
          return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        })
        setOrders(sortedOrders)
      }
    },
  })

  useEffect(() => {
    if (router.query?.section === 'orders') {
      const orderBlock = document.getElementById('orders')
      orderBlock?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  return (
    <Wrapper>
      <Title>Мои заказы</Title>
      {loading && <RotatingLoader />}
      {orders?.length && !loading ? (
        <OrdersList>
          {orders.map(order => (
            <Order order={order} />
          ))}
        </OrdersList>
      ) : (
        <NoOrders>Нет заказов</NoOrders>
      )}
    </Wrapper>
  )
}

export default CabinetOrders
