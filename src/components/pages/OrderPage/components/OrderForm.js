import { Field } from 'react-final-form'
import { useEffect } from 'react'
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
import Error from '../../../blocks/Form/Error'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
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
  BrandsAddresses,
} from './../styles'
import { useMedia } from 'use-media'
import { selectedGroupNamesMax } from '../../../../utils/serviceCatalog'
import Steps from './Steps'
import BrandAddress from './BrandAddress'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const OrderForm = ({
  onSubmit,
  errors,
  isErrorPopupOpen,
  setErrorPopupOpen,
  clickAddress,
  setClickAddress,
  setClickCity,
  mapRef,
  mapData,
  coordinates,
  masterSpecializationsCatalog,
  setShippingMethod,
  setPaymentType,
  paymentType,
  shippingMethod,
  formValues,
  productBrands,
  user,
}) => {
  const mobileMedia = useMedia({ maxWidth: 768 })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { me } = useAuthStore(getStoreData)

  console.log('formValues', formValues)

  return (
    <Content>
      <Title>Оформление заказа</Title>
      {mobileMedia ? <Steps active={1} /> : null}
      <AutoFocusedForm
        initialValues={
          formValues
            ? {
                name: user?.info?.username,
                address: clickAddress?.value || '',
                email: user?.info?.email,
                phone: user?.info?.phone,
                comment: formValues?.comment,
              }
            : {
                name: user?.info?.username || '',
                address: clickAddress?.value || '',
                email: user?.info?.email || '',
                phone: user?.info?.phone || '',
              }
        }
        onSubmit={onSubmit}
        subscription={{ values: true }}
        render={({ handleSubmit, values }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                <Error
                  errors={errors}
                  isOpen={isErrorPopupOpen}
                  setOpen={setErrorPopupOpen}
                />
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
                      <RadioItem
                        active={paymentType === '1'}
                        onClick={() => setPaymentType('1')}
                      >
                        Оплата при доставке
                      </RadioItem>
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
                      {/* <ShipingItem
                        active={shippingMethod === "self"}
                        onClick={() => setShippingMethod("self")}
                      >
                        Самовывоз
                      </ShipingItem> */}
                      <ShipingItem
                        active={shippingMethod === 'courier'}
                        onClick={() => setShippingMethod('courier')}
                      >
                        Курьер
                      </ShipingItem>
                    </ShipingWrap>
                    {shippingMethod === 'courier' ? (
                      <Field
                        name="address"
                        fullWidth={true}
                        component={AddressNoSalonField}
                        setClickAddress={setClickAddress}
                        setClickCity={setClickCity}
                        label="Адрес доставки *"
                      />
                    ) : (
                      <>
                        {shippingMethod === 'self' &&
                        formValues?.brandsIds?.length ? (
                          <BrandsAddresses>
                            {formValues?.brandsIds?.map(brandId => (
                              <BrandAddress brandId={brandId} key={brandId} />
                            ))}
                          </BrandsAddresses>
                        ) : null}
                        {shippingMethod === 'self' && productBrands?.length ? (
                          <BrandsAddresses>
                            {productBrands?.map(brand => (
                              <BrandAddress
                                brandId={brand?.id}
                                key={brand?.id}
                              />
                            ))}
                          </BrandsAddresses>
                        ) : null}
                        <YMaps>
                          <Map
                            instanceRef={mapRef}
                            width="100%"
                            defaultState={mapData}
                          >
                            {coordinates.map((coordinate, i) => (
                              <Placemark key={i} geometry={coordinate} />
                            ))}
                          </Map>
                        </YMaps>
                      </>
                    )}
                  </Right>
                </ContentForm>

                <ButtonWrap>
                  <Button variant="red" size="medium" autoFocus type="submit">
                    Подтвердить заказ
                  </Button>
                </ButtonWrap>
              </form>
            </>
          )
        }}
      />
    </Content>
  )
}

export default OrderForm
