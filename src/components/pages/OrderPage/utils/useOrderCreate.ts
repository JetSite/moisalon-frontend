import { ApolloError, useMutation } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import { REMOVE_CART } from 'src/api/graphql/cart/mutations/removeCart'
import { CREATE_ORDER } from 'src/api/graphql/order/mutations/createOrder'
import { CREATE_ORDER_ADDRESS } from 'src/api/graphql/order/mutations/createOrderAddress'
import { IErrorProps } from 'src/components/blocks/Form/Error'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IDeliveryMethods, IPaymentMethods } from 'src/types'
import { IBrand } from 'src/types/brands'
import { IID, ISetState } from 'src/types/common'
import { ICart } from 'src/types/product'
import { filterCheckedBrands } from '../../Cart/utils'
import {
  IInitialValuesOrderForm,
  ISuccessOrderValues,
  getInitialValues,
  getPrepareOrder,
} from './getOrderData'
import { IUser } from 'src/types/me'
import { IAddressSuggestion } from 'src/components/blocks/Form/AddressField/useAddressSuggestions'
import { UPDATE_ORDER_ADDRESS } from 'src/api/graphql/order/mutations/updateOrderAddress'

export interface IUseOrderCreate
  extends Pick<IErrorProps, 'errors' | 'setErrors'> {
  handleCreateOrderAdress: HandleCreateOrderAddress
  loading: boolean
  handleCreateOrder: () => void
  brands: IBrand[]
  successOrderValues: ISuccessOrderValues | null
  setOrderForm: ISetState<boolean>
  orderForm: boolean
  successPage: boolean
  initialValues: IInitialValuesOrderForm
  deliveryType: IDeliveryMethods['id']
  setDeliveryType: ISetState<IDeliveryMethods['id']>
  paymentType: IPaymentMethods['id']
  setPaymentType: ISetState<IPaymentMethods['id']>
  fullAddress: IAddressSuggestion | null
  setFullAddress: ISetState<IAddressSuggestion | null>
}

type HandleCreateOrderAddress = (values: IInitialValuesOrderForm) => void

interface IUseOrderCreateProps {
  cart: ICart
  user: IUser
  deliveryMethodID: IDeliveryMethods['id']
  paymentMethodID: IPaymentMethods['id']
}

type UseOrderCreate = (props: IUseOrderCreateProps) => IUseOrderCreate

export const useOrderCreate: UseOrderCreate = ({
  cart,
  user,
  deliveryMethodID,
  paymentMethodID,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [addressID, setAddressID] = useState<IID | null>(null)
  const { setCart } = useAuthStore(getStoreEvent)
  const [successPage, setSuccessPage] = useState(false)
  const [orderForm, setOrderForm] = useState(true)
  const [brands, setBrands] = useState<IBrand[]>([])
  const [successOrderValues, setSuccessOrderValues] =
    useState<ISuccessOrderValues | null>(null)
  const [deliveryType, setDeliveryType] =
    useState<IDeliveryMethods['id']>(deliveryMethodID)
  const [paymentType, setPaymentType] =
    useState<IPaymentMethods['id']>(paymentMethodID)
  const [fullAddress, setFullAddress] = useState<IAddressSuggestion | null>(
    null,
  )

  useEffect(() => {
    const allBrands = cart.cartContent.map(item => item.product.brand)
    setBrands(filterCheckedBrands(cart.cartContent, allBrands))
  }, [cart.cartContent])

  const onError = (error: ApolloError) => {
    setErrors(['Ошибка: ' + error.message])
    setLoading(false)
  }

  const onCompleted = (data: any) => {
    const id = data.createOrderAddress?.data?.id ?? null
    id && setAddressID(id)
    setLoading(false)
    setOrderForm(false)
    window.scrollTo(0, 0)
    // window.history.pushState(window.history.state, '', '/success')
  }

  const [createOrder] = useMutation(CREATE_ORDER, { onError })
  const [createOrderAddress] = useMutation(CREATE_ORDER_ADDRESS, { onError })
  const [updateOrderAddress] = useMutation(UPDATE_ORDER_ADDRESS, { onError })
  const [removeCart] = useMutation(REMOVE_CART, { onError })

  const initialValues = useMemo(
    () =>
      getInitialValues({
        user,
        successOrderValues,
      }),
    [user, successOrderValues],
  )

  const handleCreateOrderAdress: HandleCreateOrderAddress = values => {
    const { successOrderValues, input } = getPrepareOrder({
      values,
      cart,
    })
    setLoading(true)
    setSuccessOrderValues(successOrderValues)
    if (addressID) {
      updateOrderAddress({
        variables: {
          id: addressID,
          data: input,
        },
        onCompleted,
      })
    } else {
      createOrderAddress({
        variables: {
          data: input,
        },
        onCompleted,
      })
    }
  }

  const handleCreateOrder = async () => {
    if (!successOrderValues || !addressID) return
    setLoading(true)
    const { userInfo, cartContent, address, zipCode, city, ...orderValues } =
      successOrderValues
    const userInput = {
      user: user.info.id,
      contactName: successOrderValues.userInfo.username,
      contactPhone: successOrderValues.userInfo.phone,
    }
    const input = {
      ...orderValues,
      ...userInput,
      address: addressID,
      cart: cart.id,
      cartContent: cartContent.map(e => ({
        id: e.id,
        product: e.product.id,
        quantity: e.quantity,
      })),
      order_status: '8',
    }

    createOrder({
      variables: {
        data: {
          ...input,
        },
      },
      onCompleted: () => {
        window.scrollTo(0, 0)
        setSuccessPage(true)
        setSuccessOrderValues(null)
        setCart(undefined)
        setLoading(false)
        removeCart({
          variables: {
            id: cart?.id,
          },
        })
      },
    })
  }

  return {
    handleCreateOrderAdress,
    handleCreateOrder,
    successOrderValues,
    errors,
    setErrors,
    loading,
    brands,
    successPage,
    setOrderForm,
    initialValues,
    deliveryType,
    setDeliveryType,
    paymentType,
    setPaymentType,
    fullAddress,
    setFullAddress,
    orderForm,
  }
}
