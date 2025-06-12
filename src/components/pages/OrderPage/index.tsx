import { useState, useEffect, FC } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { useRouter } from 'next/router'
import { Wrapper } from './styles'
import OrderForm, { IOrderForm } from './components/OrderForm'
import SuccessForm from './components/SuccessForm'
import { ICart } from 'src/types/product'
import { IInitialValuesOrderForm } from './utils/getOrderData'
import { useOrderCreate } from './utils/useOrderCreate'
import { IUser } from 'src/types/me'
import { SuccesOrderPage } from './components/SuccesOrderPage'

export interface IOrderPageProps
  extends Pick<IOrderForm, 'paymentMethods' | 'deliveryMethods'> {
  cart: ICart
  user: IUser
}

export const configOrderForm = {
  defoultDeliveryTitle: 'Курьер',
  defoultPaymentTitle: 'Оплата при доставке',
}

const OrderPage: FC<IOrderPageProps> = ({
  cart,
  paymentMethods,
  deliveryMethods,
  user,
}) => {
  const {
    handleCreateOrderAddress,
    handleCreateOrder,
    successOrderValues,
    errors,
    setErrors,
    loading,
    brands,
    successPage,
    initialValues,
    deliveryType,
    setDeliveryType,
    paymentType,
    setPaymentType,
    fullAddress,
    setFullAddress,
    setOrderForm,
    orderForm,
  } = useOrderCreate({
    cart,
    user,
    paymentMethodID: paymentMethods?.[0].id ?? '1',
    deliveryMethodID: deliveryMethods?.[0].id ?? '1',
  })

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    router.push(`/Mastercabinet/orders`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = async (values: IInitialValuesOrderForm) => {
    if (!values.address && values.delivery_method !== '4') {
      setErrors(['Введите адресс или выберите его из выпадающего списка'])
      return
    }

    handleCreateOrderAddress(values)
  }

  const onSuccess = () => {
    handleCreateOrder()
  }

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          {successPage ? (
            <SuccesOrderPage />
          ) : !orderForm && successOrderValues ? (
            <SuccessForm
              setOrderForm={setOrderForm}
              successOrderValues={successOrderValues}
              onSuccess={onSuccess}
              handleClose={handleClose}
              open={open}
              loading={loading}
              paymentTitle={
                paymentMethods?.find(({ id }) => paymentType === id)?.title ||
                configOrderForm.defoultPaymentTitle
              }
              deliveryTitle={
                deliveryMethods?.find(({ id }) => deliveryType === id)?.name ||
                configOrderForm.defoultDeliveryTitle
              }
            />
          ) : (
            <OrderForm
              initialValues={initialValues}
              deliveryMethods={deliveryMethods}
              brands={brands}
              paymentMethods={paymentMethods}
              setDeliveryType={setDeliveryType}
              setPaymentType={setPaymentType}
              paymentType={paymentType}
              deliveryType={deliveryType}
              onSubmit={onSubmit}
              errors={errors}
              setErrors={setErrors}
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
              loading={loading}
            />
          )}
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default OrderPage
