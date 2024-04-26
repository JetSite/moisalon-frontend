import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import {
  OrderWrapper,
  OrderTop,
  TopDate,
  TopOrderNum,
  OrderDetail,
  OrderDetailMobile,
  DetailName,
  DetailValue,
  DetailsWrapper,
  OrderBottom,
  BottomButton,
  BottomButtonMobile,
  BottomProducts,
  ButtonStyled,
  OrderIcon,
  BottomProductsMobile,
  HiddenMobileOrderDetail,
  OrderDetailMobileWrap,
} from '../styles'
import BrandContacts from './BrandContacts'
import Product from './Product'
import BrandAddresses from './BrandAddresses'
import { cyrToTranslit } from '../../../../../../utils/translit'
import { getOrderPayLink } from '../../../../../../_graphql-legacy/orders/getOrderPayLink'

const Order = ({ order, me }) => {
  const [productBrands, setProductBrands] = useState([])
  const [mobileOrderProducts, setMobileOrderProducts] = useState(false)
  const router = useRouter()

  const amount = order?.product.reduce(
    (sum, { price, count }) => sum + price * count,
    0,
  )
  const paymentType = {
    0: 'оплата картой на сайте',
    1: 'оплата наличными',
    2: 'безналичный расчет',
  }

  const deliveryType = {
    0: 'самовывоз',
    1: 'курьер',
  }

  const orderStatus = {
    new: 'Новый',
    processing: 'В обработке',
    delivered: 'Доставляется',
    completed: 'Выполнен',
    deleted: 'Удален',
  }

  const orderDate = new Date(order?.createAt)

  const repeatHandler = () => {
    if (!me?.info) {
      router.push('/login')
    } else {
      sessionStorage.setItem(
        'cartChecked',
        JSON.stringify({
          items: [],
          productBrands: [...productBrands],
          order,
        }),
      )
      router.push(`/order`)
    }
  }

  const [getPayLink] = useMutation(getOrderPayLink, {
    variables: {
      orderId: order.id,
    },
    onCompleted: result => {
      router.push(result.orderPayLink)
    },
  })

  const payHandler = () => {
    if (!me?.info) {
      router.push('/login')
    } else {
      getPayLink({
        variables: {
          orderId: order.id,
        },
      })
    }
  }

  return (
    <OrderWrapper>
      <OrderTop>
        <TopDate>
          {orderDate.toLocaleString([], {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </TopDate>
        <TopOrderNum>№ {order?.number}</TopOrderNum>
      </OrderTop>
      <OrderDetail>
        <DetailName>Статус заказа</DetailName>
        <DetailValue>{orderStatus[order?.status?.toLowerCase()]}</DetailValue>
      </OrderDetail>
      {order?.address ? (
        <OrderDetail>
          <DetailName>Адрес</DetailName>
          <DetailValue>{order?.address}</DetailValue>
        </OrderDetail>
      ) : null}
      {!order?.address ? (
        <OrderDetail>
          <DetailName>Адрес</DetailName>
          <DetailsWrapper>
            {order?.brandsIds?.map(brandId => (
              <BrandAddresses brandId={brandId} key={brandId} />
            ))}
          </DetailsWrapper>
        </OrderDetail>
      ) : null}
      <HiddenMobileOrderDetail>
        <DetailName>Тип доставки</DetailName>
        <DetailValue>{deliveryType[order?.delivery]}</DetailValue>
      </HiddenMobileOrderDetail>
      <OrderDetail>
        <DetailName>Сумма заказа</DetailName>
        <DetailValue>{amount.toFixed(2)} ₽</DetailValue>
      </OrderDetail>
      <HiddenMobileOrderDetail>
        <DetailName>Способ оплаты</DetailName>
        <DetailValue>{paymentType[order?.payment]}</DetailValue>
      </HiddenMobileOrderDetail>
      <HiddenMobileOrderDetail>
        <DetailName>Связаться с менеджером</DetailName>
        <DetailsWrapper>
          {order?.brandsIds?.map(brandId => (
            <BrandContacts
              brandId={brandId}
              key={brandId}
              productBrands={productBrands}
              setProductBrands={setProductBrands}
            />
          ))}
        </DetailsWrapper>
      </HiddenMobileOrderDetail>
      <OrderDetailMobile
        onClick={() => setMobileOrderProducts(!mobileOrderProducts)}
      >
        <DetailName>Состав заказа:</DetailName>
        <OrderIcon opened={mobileOrderProducts} />
      </OrderDetailMobile>
      <OrderBottom>
        {order?.status?.toLowerCase() === 'new' ? (
          <BottomButton>
            <ButtonStyled
              variant="withRoundBorder"
              size="round218"
              font="roundMedium"
              onClick={payHandler}
            >
              Оплатить заказ
            </ButtonStyled>
          </BottomButton>
        ) : (
          <BottomButton>
            <ButtonStyled
              variant="withRoundBorder"
              size="round218"
              font="roundMedium"
              onClick={repeatHandler}
            >
              Повторить заказ
            </ButtonStyled>
          </BottomButton>
        )}

        <BottomProducts>
          {order?.product.map(item => (
            <Product item={item} key={item.id} />
          ))}
        </BottomProducts>

        {mobileOrderProducts ? (
          <>
            <OrderDetailMobileWrap>
              <DetailName>Тип доставки</DetailName>
              <DetailValue>{deliveryType[order?.delivery]}</DetailValue>
            </OrderDetailMobileWrap>
            <OrderDetailMobileWrap>
              <DetailName>Способ оплаты</DetailName>
              <DetailValue>{paymentType[order?.payment]}</DetailValue>
            </OrderDetailMobileWrap>
            <OrderDetailMobileWrap>
              <DetailName>Связаться с менеджером</DetailName>
              <DetailsWrapper>
                {order?.brandsIds?.map(brandId => (
                  <BrandContacts
                    brandId={brandId}
                    key={brandId}
                    productBrands={productBrands}
                    setProductBrands={setProductBrands}
                  />
                ))}
              </DetailsWrapper>
            </OrderDetailMobileWrap>

            <BottomProductsMobile>
              {order?.product.map(item => (
                <Product item={item} key={item.id} />
              ))}
            </BottomProductsMobile>
          </>
        ) : null}
        <BottomButtonMobile>
          {order?.status?.toLowerCase() === 'new' ? (
            <ButtonStyled
              variant="withRoundBorder"
              size="round148"
              font="roundSmall"
              onClick={payHandler}
            >
              Оплатить заказ
            </ButtonStyled>
          ) : (
            <ButtonStyled
              variant="withRoundBorder"
              size="round148"
              font="roundSmall"
              onClick={repeatHandler}
            >
              Повторить заказ
            </ButtonStyled>
          )}
        </BottomButtonMobile>
      </OrderBottom>
    </OrderWrapper>
  )
}

export default Order
