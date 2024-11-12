import parseToFloat from '../../../../utils/parseToFloat'
import Button from '../../../ui/Button'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  SuccessWrapper,
  Content,
  Title,
  SuccessLeft,
  SuccessRight,
  Desc,
  ItemChecked,
  Text,
  ContentWrap,
  ImageWrapper,
  ItemCheckedRight,
  Name,
  Bottom,
  Price,
  Quantity,
  Total,
  TextSumm,
  TextTotal,
  ButtonWrap,
} from '../styles'
import { useMedia } from 'use-media'
import PopupOrder from './PopupOrder'
import Steps from './Steps'
import RepeatOrderProduct from './RepeatOrderProduct'
import { PHOTO_URL } from '../../../../api/variables'
import { ICart } from 'src/types/product'
import { IUser } from 'src/types/me'
import { IOrderInput } from 'src/types/orders'

interface IProps {
  formValues: Partial<IOrderInput> | null
  user: IUser | null
  cart: ICart | null
  addressFull?: string
  onSuccess: () => void
  open: boolean
  handleClose: () => void
  setSuccessPage: (value: boolean) => void
}

const SuccessForm: FC<IProps> = ({
  formValues,
  user,
  cart,
  addressFull,
  onSuccess,
  open,
  handleClose,
  setSuccessPage,
}) => {
  const router = useRouter()
  const mobileMedia = useMedia({ maxWidth: 768 })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url === '/order') {
        setSuccessPage(false)
        return false
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [router])

  const amount =
    cart?.cartContent?.reduce((acc, item) => {
      const price = item.product.salePrice || item.product.regularPrice
      return acc + price * item.quantity
    }, 0) || 0

  return (
    <>
      <Content>
        <Title>Подтверждение заказа</Title>
        {mobileMedia ? <Steps active={2} /> : null}
        <SuccessWrapper>
          <SuccessLeft>
            <ContentWrap>
              <Desc>Данные получателя</Desc>
              <Text>{user?.info?.username}</Text>
              <Text>{user?.info?.phone}</Text>
              <Text>{user?.info?.email}</Text>
            </ContentWrap>
            {formValues?.address ? (
              <ContentWrap>
                <Desc>Адрес доставки</Desc>
                <Text>{addressFull}</Text>
              </ContentWrap>
            ) : null}
            <ContentWrap>
              <Desc>Способ оплаты</Desc>
              <Text>
                {formValues?.payment_method === '1'
                  ? 'Оплата при доставке'
                  : formValues?.payment_method === '5'
                  ? 'Оплата по номеру карты'
                  : ''}
              </Text>
            </ContentWrap>
            {formValues?.comment ? (
              <ContentWrap>
                <Desc>Комментарий к заказу</Desc>
                <Text>{formValues?.comment}</Text>
              </ContentWrap>
            ) : null}
          </SuccessLeft>
          <SuccessRight>
            <Desc>Состав заказа</Desc>
            {cart &&
              cart.cartContent.map(cartItem => {
                return (
                  <ItemChecked key={cartItem.product.id}>
                    <ImageWrapper>
                      <img
                        src={
                          cartItem?.product?.cover?.url
                            ? ` ${PHOTO_URL}${cartItem.product.cover.url}`
                            : '/cosmetic_placeholder.jpg'
                        }
                        alt="logo"
                      />
                    </ImageWrapper>
                    <ItemCheckedRight>
                      <Name>{cartItem.product.name}</Name>
                      <Bottom>
                        <Price>{`${
                          cartItem.product.salePrice
                            ? cartItem.product.salePrice * cartItem.quantity
                            : cartItem.product.regularPrice * cartItem.quantity
                        } ₽`}</Price>
                        <Quantity>{cartItem.quantity} шт.</Quantity>
                      </Bottom>
                    </ItemCheckedRight>
                  </ItemChecked>
                )
              })}
            {/* {formValues?.product
              ? formValues?.product.map(product => (
                  <RepeatOrderProduct product={product} key={product.id} />
                ))
              : null} */}
            <Total>
              <TextSumm>Сумма заказа:</TextSumm>
              <TextTotal>{`${amount} ₽`}</TextTotal>
            </Total>
            <ButtonWrap>
              <Button
                variant="red"
                size="medium"
                autoFocus
                onClick={() => onSuccess()}
              >
                Оформить заказ
              </Button>
            </ButtonWrap>
          </SuccessRight>
        </SuccessWrapper>
      </Content>
      <PopupOrder handleCloseSuccess={handleClose} open={open} />
    </>
  )
}

export default SuccessForm
