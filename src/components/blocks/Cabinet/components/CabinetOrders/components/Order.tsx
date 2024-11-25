import { FC, useState } from 'react'
import * as Styled from '../styles'
import BrandContacts from './BrandContacts'
import { IOrder } from 'src/types/orders'
import Product from './Product'

interface IProps {
  order: IOrder
}

const Order: FC<IProps> = ({ order }) => {
  const [mobileOrderProducts, setMobileOrderProducts] = useState(false)

  const totalAmount =
    order.cartContent?.reduce(
      (acc, item) =>
        acc +
        (item.product.salePrice || item.product.regularPrice) * item.quantity,
      0,
    ) + ` ₽`

  const deliveryTitle =
    order?.delivery_method?.name ?? 'Не указан способ доставки'
  const paymentMethodTitle =
    order.payment_method?.title ?? 'Не указан способ оплаты'
  const orderStatusTitle = order.order_status?.title ?? 'Неизвестный статус'

  const orderDate = new Date(order.createdAt)

  const repeatHandler = () => {
    // sessionStorage.setItem(
    //   'cartChecked',
    //   JSON.stringify({
    //     items: [],
    //     productBrands: [...productBrands],
    //     order,
    //   }),
    // )
    // router.push(`/order`)
  }

  const payHandler = () => {
    // if (!me?.info) {
    //   router.push('/login')
    // } else {
    //   getPayLink({
    //     variables: {
    //       orderId: order.id,
    //     },
    //   })
    // }
  }

  const brandContact = () => {
    return (
      <>
        <Styled.DetailName>Связаться с менеджером</Styled.DetailName>
        <Styled.DetailsWrapper>
          {order.cartContent?.map(
            cart =>
              cart.product.brand.phones.length && (
                <BrandContacts
                  key={cart.product.id}
                  phone={cart.product.brand.phones[0]}
                />
              ),
          )}
        </Styled.DetailsWrapper>
      </>
    )
  }

  return (
    <Styled.OrderWrapper>
      <Styled.OrderTop>
        <Styled.TopDate>
          {orderDate.toLocaleString([], {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </Styled.TopDate>
        <Styled.TopOrderNum>№ {order?.id}</Styled.TopOrderNum>
      </Styled.OrderTop>
      {order.order_status?.title && (
        <Styled.OrderDetail>
          <Styled.DetailName>Статус заказа</Styled.DetailName>
          <Styled.DetailValue>{orderStatusTitle}</Styled.DetailValue>
        </Styled.OrderDetail>
      )}
      {order.contactName && order.contactPhone ? (
        <Styled.OrderDetail>
          <Styled.DetailName>Контактные данные</Styled.DetailName>
          <Styled.DetailValue>
            {order.contactName + ' ' + order.contactPhone}
          </Styled.DetailValue>
        </Styled.OrderDetail>
      ) : null}
      {order.address ? (
        <Styled.OrderDetail>
          <Styled.DetailName>Адрес</Styled.DetailName>
          <Styled.DetailValue>{order.address.address}</Styled.DetailValue>
        </Styled.OrderDetail>
      ) : null}
      <Styled.HiddenMobileOrderDetail>
        <Styled.DetailName>Тип доставки</Styled.DetailName>
        <Styled.DetailValue>{deliveryTitle}</Styled.DetailValue>
      </Styled.HiddenMobileOrderDetail>
      <Styled.OrderDetail>
        <Styled.DetailName>Сумма заказа</Styled.DetailName>
        <Styled.DetailValue>{totalAmount}</Styled.DetailValue>
      </Styled.OrderDetail>
      <Styled.HiddenMobileOrderDetail>
        <Styled.DetailName>Способ оплаты</Styled.DetailName>
        <Styled.DetailValue>{paymentMethodTitle}</Styled.DetailValue>
      </Styled.HiddenMobileOrderDetail>
      <Styled.HiddenMobileOrderDetail>
        {brandContact()}
      </Styled.HiddenMobileOrderDetail>
      <Styled.OrderDetailMobile
        onClick={() => setMobileOrderProducts(!mobileOrderProducts)}
      >
        <Styled.DetailName>Состав заказа:</Styled.DetailName>
        <Styled.OrderIcon opened={mobileOrderProducts} />
      </Styled.OrderDetailMobile>
      <Styled.BottomButton>
        <Styled.ButtonStyled
          variant="withRoundBorder"
          size="round218"
          disabled
          font="roundMedium"
          style={{ margin: '20px 0 10px 0' }}
        >
          {orderStatusTitle}
        </Styled.ButtonStyled>
      </Styled.BottomButton>
      {['1', '4'].includes(order.order_status?.id) && (
        <Styled.BottomButton>
          <Styled.ButtonStyled
            variant="withRoundBorder"
            size="round218"
            font="roundMedium"
            onClick={repeatHandler}
          >
            {order.order_status.id === '1'
              ? 'Оплатить заказ'
              : 'Повторить заказ'}
          </Styled.ButtonStyled>
        </Styled.BottomButton>
      )}
      <Styled.BottomProducts>
        {order?.cartContent.map(item => (
          <Product item={item} key={item.product.id} />
        ))}
      </Styled.BottomProducts>

      {mobileOrderProducts ? (
        <>
          <Styled.OrderDetailMobileWrap>
            <Styled.DetailName>Тип доставки</Styled.DetailName>
            <Styled.DetailValue>{deliveryTitle}</Styled.DetailValue>
          </Styled.OrderDetailMobileWrap>
          <Styled.OrderDetailMobileWrap>
            <Styled.DetailName>Способ оплаты</Styled.DetailName>
            <Styled.DetailValue>{paymentMethodTitle}</Styled.DetailValue>
          </Styled.OrderDetailMobileWrap>
          <Styled.OrderDetailMobileWrap>
            {brandContact()}
          </Styled.OrderDetailMobileWrap>

          <Styled.BottomProductsMobile>
            {order?.cartContent.map(item => (
              <Product item={item} key={item.product.id} />
            ))}
          </Styled.BottomProductsMobile>
        </>
      ) : null}
      <Styled.BottomButtonMobile>
        <Styled.ButtonStyled
          variant="withRoundBorder"
          size="round148"
          disabled
          font="roundSmall"
          style={{ margin: '20px 0 10px 0' }}
        >
          {orderStatusTitle}
        </Styled.ButtonStyled>

        {['1', '4'].includes(order.order_status?.id) && (
          <Styled.ButtonStyled
            variant="withRoundBorder"
            size="round148"
            font="roundSmall"
            onClick={payHandler}
          >
            {order.order_status?.id === '1'
              ? 'Оплатить заказ'
              : 'Повторить заказ'}
          </Styled.ButtonStyled>
        )}
      </Styled.BottomButtonMobile>
    </Styled.OrderWrapper>
  )
}

export default Order
