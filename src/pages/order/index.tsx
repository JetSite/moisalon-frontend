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
  AttributesObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { CART_BY_ID } from 'src/api/graphql/cart/queries/getCart'

interface Props extends IOrderPageProps, IAppProps {}

const Order: FC<Props> = props => {
  return <OrderPage {...props} />
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

  const cartID: IID = (user.data as AttributesObject)?.attributes?.cart?.id

  if (!cartID) {
    return { redirect }
  }

  const cartData = await apolloClient.query({
    query: CART_BY_ID,
    variables: { id: cartID },
  })

  if (cartData.error || cartData.errors) {
    return { redirect }
  }

  const cart: ICart = flattenStrapiResponse(cartData.data.cart)

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      cart,
      user,
    },
  })
}

export default Order
