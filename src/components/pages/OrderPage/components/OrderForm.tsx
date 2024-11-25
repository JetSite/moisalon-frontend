import { Field } from 'react-final-form'
import { FC, useEffect, useRef } from 'react'
import {
  phone,
  required,
  composeValidators,
  email,
} from '../../../../utils/validations'
import Button from '../../../ui/Button'
import { TextField } from '../../../blocks/Form'
import AddressNoSalonField from '../../../blocks/Form/AddressField/AddressNoSalonField'
import AutoFocusedForm from '../../../blocks/Form/AutoFocusedForm'
import ErrorPopup, { IErrorProps } from '../../../blocks/Form/Error'
import {
  Content,
  Title,
  ContentForm,
  Left,
  Right,
  Desc,
  FieldWrap,
  ShipingWrap,
  ShipingItem,
  RadioWrap,
  RadioItem,
  TextAreaWrap,
  ButtonWrap,
} from '../styles'
import { useMedia } from 'use-media'
import Steps from './Steps'
import BrandAddress from './BrandAddress'
import { IDeliveryMethods, IPaymentMethods } from 'src/types'
import { IAddressSuggestion } from 'src/components/blocks/Form/AddressField/useAddressSuggestions'
import { FormApi } from 'final-form'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import { IInitialValuesOrderForm } from '../utils/getOrderData'
import { configOrderForm } from '..'
import BackButton from '../../../ui/BackButton'

export interface IOrderForm extends IErrorProps {
  paymentMethods: IPaymentMethods[] | null
  deliveryMethods: IDeliveryMethods[] | null
  paymentType: IPaymentMethods['id']
  deliveryType: IDeliveryMethods['id']
  setDeliveryType: ISetState<IDeliveryMethods['id']>
  setPaymentType: ISetState<IPaymentMethods['id']>
  brands: IBrand[]
  loading: boolean
  intialValues: IInitialValuesOrderForm
  fullAddress: IAddressSuggestion | null
  setFullAddress: ISetState<IAddressSuggestion | null>
  onSubmit: (values: IInitialValuesOrderForm) => Promise<void>
}

const OrderForm: FC<IOrderForm> = ({
  paymentMethods,
  deliveryMethods,
  brands,
  setDeliveryType,
  setPaymentType,
  paymentType,
  deliveryType,
  onSubmit,
  errors,
  loading,
  setErrors,
  intialValues,
  fullAddress,
  setFullAddress,
}) => {
  const mobileMedia = useMedia({ maxWidth: 768 })
  const formRef = useRef<FormApi<IInitialValuesOrderForm>>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    formRef.current?.change('payment_method', paymentType)
    formRef.current?.change('delivery_method', deliveryType)

    if (fullAddress) {
      formRef.current?.change('zipCode', fullAddress.zipcode)
      formRef.current?.change('city', fullAddress.city)
      formRef.current?.change('address', fullAddress.value)
    }
  }, [formRef.current, paymentType, deliveryType, fullAddress])

  return (
    <>
      <BackButton type="Вернуться в корзину" link={`/cart`} onlyType />
      <Content>
        <Title>Оформление заказа</Title>
        {mobileMedia ? <Steps active={1} /> : null}
        <AutoFocusedForm<IInitialValuesOrderForm>
          initialValues={intialValues}
          onSubmit={onSubmit}
          subscription={{ values: true }}
          render={({ handleSubmit, form, pristine }) => {
            formRef.current = form
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <ContentForm>
                    <Left>
                      <Desc>Данные получателя</Desc>
                      <FieldWrap>
                        <Field
                          name="name"
                          component={TextField}
                          label="Имя, фамилия *"
                          validate={required}
                          requiredfield="true"
                        />
                      </FieldWrap>
                      <FieldWrap>
                        <Field
                          name="phone"
                          type="phone"
                          component={TextField}
                          label="Телефон *"
                          validate={composeValidators(required, phone)}
                        />
                      </FieldWrap>
                      <FieldWrap>
                        <Field
                          name="email"
                          inputMode="email"
                          component={TextField}
                          label="E-mail *"
                          validate={composeValidators(required, email)}
                        />
                      </FieldWrap>
                      {/* <FieldWrap>
                      <Field
                        name="specialization"
                        component={TextField}
                        label="Специализация *"
                        validate={required}
                      />
                    </FieldWrap> */}
                      <Desc>Способ оплаты</Desc>
                      <RadioWrap>
                        {paymentMethods ? (
                          paymentMethods.map(method => (
                            <RadioItem
                              active={method.id === paymentType}
                              onClick={() => setPaymentType(method.id)}
                            >
                              {method.title}
                            </RadioItem>
                          ))
                        ) : (
                          <RadioItem active={paymentType === '1'}>
                            {configOrderForm.defoultPaymentTitle}
                          </RadioItem>
                        )}
                      </RadioWrap>
                      <Desc>Комментарий к заказу</Desc>
                      <TextAreaWrap>
                        <Field
                          name="comment"
                          multiple={true}
                          component={TextField}
                          label=""
                        />
                      </TextAreaWrap>
                    </Left>
                    <Right>
                      <Desc>Способ доставки</Desc>
                      <ShipingWrap>
                        {deliveryMethods ? (
                          deliveryMethods.map(method => (
                            <ShipingItem
                              active={deliveryType == method.id}
                              onClick={() => setDeliveryType(method.id)}
                            >
                              {method.name}
                            </ShipingItem>
                          ))
                        ) : (
                          <ShipingItem active={deliveryType === '1'}>
                            {configOrderForm.defoultDeliveryTitle}
                          </ShipingItem>
                        )}
                      </ShipingWrap>
                      {deliveryType !== '4' ? (
                        <Field
                          name="address"
                          component={AddressNoSalonField}
                          setFullAddress={setFullAddress}
                          label="Адрес доставки *"
                          helperText="Введите полный адресс"
                          onlyFull
                          requiredField
                        />
                      ) : (
                        <BrandAddress brands={brands} />
                      )}
                    </Right>
                  </ContentForm>
                  <ErrorPopup errors={errors} setErrors={setErrors} />
                  <ButtonWrap>
                    <Button
                      disabled={loading}
                      loading={loading}
                      variant="red"
                      size="medium"
                      autoFocus
                      type="submit"
                    >
                      Подтвердить заказ
                    </Button>
                  </ButtonWrap>
                </form>
              </>
            )
          }}
        />
      </Content>
    </>
  )
}

export default OrderForm
