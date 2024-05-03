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
import { YMaps, Map, Placemark } from 'react-yandex-maps'
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
  setClickAddress,
  mapRef,
  mapData,
  coordinates,
  masterSpecializationsCatalog,
  setShippingMethod,
  setShippingType,
  shippingType,
  shippingMethod,
  formValues,
  productBrands,
}) => {
  const mobileMedia = useMedia({ maxWidth: 768 })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { me } = useAuthStore(getStoreData)

  return (
    <Content>
      <Title>Оформление заказа</Title>
      {mobileMedia ? <Steps active={1} /> : null}
      <AutoFocusedForm
        initialValues={
          formValues
            ? {
                name: formValues?.name,
                address: formValues?.address || '',
                email: formValues?.email,
                phone: formValues?.phone,
                comment: formValues?.comment,
                specialization: formValues?.specialization,
                inn: formValues?.inn,
                products: formValues?.products,
              }
            : {
                name: me?.master?.name || '',
                address:
                  (me &&
                    me.master &&
                    me.master.addressFull &&
                    me.master.addressFull.full) ||
                  '',
                email: me?.info?.email,
                phone: me?.info?.phoneNumber,
                specialization: selectedGroupNamesMax(
                  me?.master?.specializations
                    ? me?.master?.specializations[0]
                    : [],
                  masterSpecializationsCatalog,
                  ', ',
                  1,
                ),
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
                    <FieldWrap>
                      <Field
                        name="specialization"
                        component={TextField}
                        label="Специализация *"
                        validate={required}
                      />
                    </FieldWrap>
                    <FieldWrap>
                      <Field name="inn" component={TextField} label="ИНН" />
                    </FieldWrap>
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
                <Desc>Способ оплаты</Desc>
                <RadioWrap>
                  <RadioItem
                    active={shippingType === 0}
                    onClick={() => setShippingType(0)}
                  >
                    Оплата картой на сайте
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
