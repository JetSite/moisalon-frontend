import { IDeliveryMethods, IPaymentMethods } from 'src/types'
import { totalSumm } from '../../Cart/utils'
import { IMeInfo, IUser } from 'src/types/me'
import { ICart, IProductCart } from 'src/types/product'

export interface IOrderAddressInput {
  firstName: string
  email: string
  phone: string
  address: string
  city: string | null
  zipCode: string | null
  title: string
}

export interface IInitialValuesOrderForm
  extends Pick<
    IOrderAddressInput,
    'address' | 'city' | 'zipCode' | 'email' | 'phone'
  > {
  name: string
  comment: string
  payment_method: IPaymentMethods['id']
  delivery_method: IDeliveryMethods['id']
}

type GetInitialValues = (
  props: IGetInitialValuesProps,
) => IInitialValuesOrderForm

interface IGetInitialValuesProps {
  successOrderValues: ISuccessOrderValues | null
  user: IUser
}

export const getInitialValues: GetInitialValues = ({
  user,
  successOrderValues,
}) => {
  const hiddenVallues = {
    payment_method: successOrderValues?.payment_method ?? '1',
    delivery_method: successOrderValues?.delivery_method ?? '1',
    zipCode: successOrderValues?.zipCode ?? null,
    city: successOrderValues?.city ?? null,
  }
  return {
    name: successOrderValues?.userInfo.username || user.info?.username,
    address: successOrderValues?.address ?? '',
    email: successOrderValues?.userInfo.email || user.info?.email,
    phone: successOrderValues?.userInfo.phone || user.info?.phone,
    comment: successOrderValues?.comment ?? '',
    ...hiddenVallues,
  }
}

export interface ISuccessOrderValues {
  title: string
  userInfo: Pick<IMeInfo, 'username' | 'phone' | 'email'>
  cartContent: IProductCart[]
  payment_method: IPaymentMethods['id']
  delivery_method: IDeliveryMethods['id']
  comment: string
  address: string
  total: number
  zipCode: string | null
  city: string | null
}

export interface IGetPrepareOrder {
  successOrderValues: ISuccessOrderValues
  input: IOrderAddressInput
}

interface IGetPrepareOrderProps {
  cart: ICart
  values: IInitialValuesOrderForm
}
type GetPrepareOrder = (props: IGetPrepareOrderProps) => IGetPrepareOrder

export const getPrepareOrder: GetPrepareOrder = ({ values, cart }) => {
  const input: IOrderAddressInput = {
    title: values.address,
    city: values.city,
    address: values.address,
    zipCode: values.zipCode,
    firstName: values.name,
    email: values.email,
    phone: values.phone,
  }

  const title =
    values.delivery_method !== '1'
      ? `Заказ пользователя ${values.name || ''} с корзиной №${cart?.id || ''}`
      : `Заказ пользователя ${values.name}`

  const successOrderValues: ISuccessOrderValues = {
    title,
    userInfo: {
      username: values.name,
      email: values.email,
      phone: values.phone,
    },
    cartContent: cart.cartContent,
    payment_method: values.payment_method,
    delivery_method: values.delivery_method,
    comment: values.comment,
    address: values.address,
    total: totalSumm(cart.cartContent),
    zipCode: values.zipCode,
    city: values.city,
  }

  return { successOrderValues, input }
}
