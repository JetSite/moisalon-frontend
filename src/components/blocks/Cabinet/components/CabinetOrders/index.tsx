import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import { NoOrders, OrdersList, Title, Wrapper } from './styles'
import Order from './components/Order'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ORDERS_BY_USER } from 'src/api/graphql/order/queries/ordersByUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import { IUser } from 'src/types/me'
import { IOrder } from 'src/types/orders'

interface Props {
  user: IUser
}

const CabinetOrders: FC<Props> = ({ user }) => {
  const router = useRouter()
  const [orders, setOrders] = useState<IOrder[]>(user.orders)

  const [refetch, { loading }] = useLazyQuery(ORDERS_BY_USER, {
    onCompleted: data => {
      if (data?.orders?.data?.length) {
        const ordersData: IOrder[] = flattenStrapiResponse(data?.orders) || []
        setOrders(ordersData)
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

  return (
    <Wrapper>
      <Title>Мои заказы</Title>
      {loading && <RotatingLoader />}
      {orders?.length ? (
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
