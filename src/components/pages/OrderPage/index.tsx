import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { useRouter } from 'next/router'
import BackButton from '../../ui/BackButton'
import { Wrapper, SuccessOrderWrapper, SuccessOrderText } from './styles'
import OrderForm from './components/OrderForm'
import catalogOrDefault from '../../../utils/catalogOrDefault'
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import { cyrToTranslit } from '../../../utils/translit'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { CREATE_ORDER } from 'src/api/graphql/order/mutations/createOrder'
import { CREATE_ORDER_ADDRESS } from 'src/api/graphql/order/mutations/createOrderAddress'
import { IAddressSuggestion } from 'src/components/blocks/Form/AddressField/useAddressSuggestions'
import { IOrderInput } from 'src/types/orders'
import SuccessForm from './components/SuccessForm'
import { REMOVE_CART } from 'src/api/graphql/cart/mutations/removeCart'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { useQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const paymentsMethods = {
  1: 'Оплата при доставке',
  2: 'Paypal',
  3: 'Чековые платежи',
  4: 'Прямой банковский перевод',
  5: 'Оплата по номеру карты',
}

const OrderPage = () => {
  const { catalogs, cart } = useBaseStore(getStoreData)
  const { user } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(getStoreEvent)
  const { setCart } = useBaseStore(getStoreEvent)

  const [successPage, setSuccessPage] = useState(false)
  const [checkOrderPage, setCheckOrderPage] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [errors, setErrors] = useState(null)
  const [shippingMethod, setShippingMethod] = useState('courier')
  const [paymentType, setPaymentType] = useState('1')
  const [mapCoordinates, setMapCoordinates] = useState([])
  const mapRef = useRef(null)
  const [clickAddress, setClickAddress] = useState<IAddressSuggestion | null>(
    null,
  )
  const [clickCity, setClickCity] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<Partial<IOrderInput> | null>(
    null,
  )
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleClose = () => {
    setOpen(false)
    router.push(`/cartB2b`)
  }

  const [createOrder] = useMutation(CREATE_ORDER)
  const [createOrderAddress] = useMutation(CREATE_ORDER_ADDRESS)
  const [removeCart] = useMutation(REMOVE_CART)

  let productBrands = []

  const mapData = {
    center: mapCoordinates?.length ? mapCoordinates[0] : [55.751574, 37.573856],
    zoom: 5,
    behaviors: ['default', 'scrollZoom'],
  }

  const coordinates = mapCoordinates

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = async values => {
    if (!values.address && shippingMethod !== 'self') {
      setErrors(['Введите адресс или выберите его из выпадающего списка'])
      setErrorPopupOpen(true)
      return
    }

    let orderValues
    let address

    const cartProducts = cart?.cartContent?.map(item => ({
      product: item?.product?.id,
      quantity: item?.quantity,
    }))

    if (shippingMethod !== 'self') {
      address = await createOrderAddress({
        variables: {
          data: {
            title: clickAddress?.value || values.address,
            city: clickCity,
            address: clickAddress?.value || values.address,
            zipCode: clickAddress?.zipcode || '',
            firstName: user?.info.username || '',
            secondName: '',
            company: '',
            email: user?.info.email || '',
            phone: user?.info.phone || '',
          },
        },
      })
      if (address?.data?.createOrderAddress?.data?.id) {
        orderValues = {
          title: `Заказ пользователя ${user?.info.username || ''} с корзиной №${
            cart?.id || ''
          }`,
          user: user?.info.id,
          cartContent: cartProducts,
          payment_method: paymentType,
          comment: values.comment,
          address: address.data.createOrderAddress.data.id,
        }
      } else {
        setErrors(['Ошибка при создании адреса'])
        setErrorPopupOpen(true)
        return
      }
    } else {
      orderValues = {
        title: `Заказ пользователя ${user?.info.username}`,
        user: user?.info.id,
        cartContent: cartProducts,
        payment_method: paymentType,
        comment: values.comment,
      }
    }

    setFormValues(orderValues)
    window.scrollTo(0, 0)
    window.history.pushState(window.history.state, '', '/success')
    setCheckOrderPage(true)
  }

  const onSuccess = async () => {
    const response = await createOrder({
      variables: {
        data: {
          ...formValues,
        },
      },
    })

    if (response?.data?.createOrder?.data?.id) {
      window.scrollTo(0, 0)
      setCheckOrderPage(false)
      setSuccessPage(true)
      setCart(null)
      await removeCart({
        variables: {
          id: cart?.id,
        },
      })
    }
  }

  useEffect(() => {
    let coordArray = []
    productBrands?.length &&
      productBrands[0]?.length &&
      productBrands[0]?.forEach(item => {
        if (item?.addressFull?.latitude && item?.addressFull?.longitude) {
          coordArray.push([
            item?.addressFull?.latitude,
            item?.addressFull?.longitude,
          ])
        }
      })
    setMapCoordinates(coordArray)
  }, [])

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          {successPage && (
            <div
              onClick={() => {
                router.push(`/`)
                window.scrollTo(0, 0)
              }}
            >
              <BackButton type="На главную" noLink onlyType />
            </div>
          )}
          {!checkOrderPage && !successPage && (
            <div
              onClick={() => {
                router.push(`/cart`)
                setCheckOrderPage(false)
                window.scrollTo(0, 0)
              }}
            >
              <BackButton type="Вернуться в корзину" noLink onlyType />
            </div>
          )}
          {checkOrderPage && !successPage && (
            <div
              onClick={() => {
                setCheckOrderPage(false)
                window.scrollTo(0, 0)
              }}
            >
              <BackButton type="Редактировать заказ" noLink onlyType />
            </div>
          )}
          {successPage && (
            <SuccessOrderWrapper>
              <SuccessOrderText>Заказ успешно оформлен</SuccessOrderText>
            </SuccessOrderWrapper>
          )}
          {checkOrderPage && !successPage && (
            <SuccessForm
              formValues={formValues}
              user={user}
              cart={cart}
              addressFull={clickAddress?.value}
              onSuccess={onSuccess}
              handleClose={handleClose}
              open={open}
              setSuccessPage={setSuccessPage}
            />
          )}
          {!successPage && !checkOrderPage && (
            <OrderForm
              formValues={formValues}
              user={user}
              onSubmit={onSubmit}
              errors={errors}
              isErrorPopupOpen={isErrorPopupOpen}
              setErrorPopupOpen={setErrorPopupOpen}
              clickAddress={clickAddress}
              setClickAddress={setClickAddress}
              setClickCity={setClickCity}
              mapRef={mapRef}
              mapData={mapData}
              coordinates={coordinates}
              setShippingMethod={setShippingMethod}
              setPaymentType={setPaymentType}
              paymentType={paymentType}
              shippingMethod={shippingMethod}
              productBrands={productBrands}
            />
          )}
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default OrderPage
