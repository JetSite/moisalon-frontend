import { GetServerSideProps } from 'next'
import { FC, Fragment } from 'react'
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
import { useRouter } from 'next/router'

interface Props extends Omit<IOrderPageProps, 'user'>, IAppProps {}

const Order: FC<Props> = ({ cart, paymentMethods, deliveryMethods, user }) => {
  const preparedUser = user ? flattenStrapiResponse(user) : null
  return (
    <Fragment>
      <OrderPage
        cart={cart}
        paymentMethods={paymentMethods}
        deliveryMethods={deliveryMethods}
        user={preparedUser}
      />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const result = await getServerUser(ctx)

  const redirect = {
    destination: '/cart',
    permanent: false,
  }

  if ('redirect' in result) {
    return {
      redirect: result.redirect,
    }
  }

  const { user, apolloClient } = result as IGetServerUserSuccess

  const userID: IID | null = ((user.data as StrapiDataObject) || null)?.id

  if (!userID) {
    return { redirect }
  }

  const cartData = await apolloClient.query({
    query: GET_CART_BY_USER,
    variables: { id: userID },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
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
      meta: {
        title: 'Оформление заказа | MOI salon',
        description:
          'Оформите заказ на платформе MOI salon - выберите способ оплаты и доставки',
        image: '/master-landing-login.jpg',
        url: 'https://moi.salon/order',
      },
    },
  })
}

export default Order
