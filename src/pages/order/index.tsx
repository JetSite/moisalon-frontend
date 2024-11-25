import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { addApolloState } from 'src/api/apollo-client'
import {
  IGetServerUserSuccess,
  getServerUser,
} from 'src/api/utils/getServerUser'
import OrderPage, { IOrderPageProps } from 'src/components/pages/OrderPage'
import { IID, Nullable } from 'src/types/common'
import { IAppProps } from '../_app'
import { ICart } from 'src/types/product'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { PAYMENT_METHODS } from 'src/api/graphql/paymentMethods/getPaymentMethods'
import { IDeliveryMethods, IPaymentMethods } from 'src/types'
import { ORDERS_DELIVERY_METHODS } from 'src/api/graphql/order/queries/orderDeliveryMethods'
import { GET_CART_BY_USER } from 'src/api/graphql/cart/queries/getCartByUser'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

interface Props extends Omit<IOrderPageProps, 'user'>, IAppProps {}

const Order: FC<Props> = ({ user: userData, ...props }) => {
  const { user } = useAuthStore(getStoreData)

  if (!user) return null

  return <OrderPage user={user} {...props} />
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const result = await getServerUser(ctx)

  const redirect = {
    destination: '/cart',
    permanent: true,
  }

  if ('redirect' in result) {
    return {
      redirect: result.redirect,
    }
  }

  const { user, apolloClient } = result as IGetServerUserSuccess

  const cartID: IID | null = ((user.data as StrapiDataObject) || null)?.id

  if (!cartID) {
    return { redirect }
  }

  const cartData = await apolloClient.query({
    query: GET_CART_BY_USER,
    variables: { id: cartID },
  })

  if (cartData.error || cartData.errors) {
    return { redirect }
  }

  const data = await Promise.allSettled([
    apolloClient.query({ query: PAYMENT_METHODS }),
    apolloClient.query({ query: ORDERS_DELIVERY_METHODS }),
  ])

  const paymentMethods: IPaymentMethods[] | null =
    data[0].status === 'fulfilled'
      ? flattenStrapiResponse(data[0].value.data.paymentMethods)
      : null

  const deliveryMethods: IDeliveryMethods[] | null =
    data[1].status === 'fulfilled'
      ? flattenStrapiResponse(data[1].value.data.orderDeliveryMethods)
      : null

  const cart: ICart | null =
    flattenStrapiResponse(cartData.data.carts)?.[0] ?? null

  if (!cart) {
    return { redirect }
  }

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      cart,
      user,
      paymentMethods,
      deliveryMethods,
    },
  })
}

export default Order
