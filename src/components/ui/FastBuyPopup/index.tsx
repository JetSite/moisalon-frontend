import { useState, useRef, useEffect, FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { PHOTO_URL } from '../../../api/variables'
import { CSSTransition } from 'react-transition-group'
import { formatMobileNumber } from '../../../utils/formatMobileNumber'
import { sendOrderOneClick } from '../../../_graphql-legacy/orders/sendOrderOneClick'
import {
  PopupWrapper,
  Wrapper,
  PopupContent,
  Left,
  Image,
  Right,
  Title,
  MinimalOrder,
  QuantityWrap,
  QuantityButtons,
  Description,
  PopupInput,
  ButtonPopup,
  Plus,
  Minus,
  Quantity,
  CloseButton,
  Success,
  Error,
  TitleWrap,
  ProductDescription,
  PriceWrap,
  Price,
  PhoneInputWrap,
  PhoneCode,
} from './styles'
import RotatingLoader from '../RotatingLoader'
import { IMe } from 'src/types/me'

interface Props {
  me: IMe
}

const FastBuyPopup: FC<Props> = ({
  item,
  openBuyPopup,
  setOpenBuyPopup,
  me,
  brand,
}) => {
  const [productQuantity, setProductQuantity] = useState(1)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const popupRef = useRef(null)

  useEffect(() => {
    if (!me?.info) return

    if (me.info.username) {
      setName(me.info.username)
    }
    if (me.info.phone) {
      setPhone(formatMobileNumber(me.info.phone))
    }
  }, [me])

  const useOutsideClick = ref => {
    useEffect(() => {
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenBuyPopup(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideClick(popupRef)

  const [sendOrder, { loading }] = useMutation(sendOrderOneClick, {
    onCompleted: res => {
      setSuccess(true)
    },
  })

  const buyProduct = () => {
    if (!name || name.length < 2) {
      setError('Некорректное имя')
      return
    }

    if (!phone || phone.length < 13) {
      setError('Некорректный номер телефона')
      return
    }

    const orderInput = {
      productId: item.id,
      productCount: productQuantity,
      name,
      phone: `8${phone.replace(/-/g, '')}`,
    }

    // sendOrder({
    //   variables: {
    //     input: orderInput,
    //   },
    // })
    setSuccess(true)
  }

  const closePopup = e => {
    setOpenBuyPopup(false)
    setSuccess(false)
    setProductQuantity(1)
    setError(null)
    setName(me?.info?.displayName ? me?.info?.displayName : '')
    setPhone(
      me?.info?.phoneNumber
        ? formatMobileNumber(me.info.phoneNumber.substring(1))
        : '',
    )
  }

  const increaseQuantity = () => {
    setProductQuantity(prevState => prevState + 1)
  }

  const decreaseQuantity = () => {
    if (productQuantity === 1) return
    setProductQuantity(prevState => prevState - 1)
  }

  const phoneChangeHandler = e => {
    setError(null)
    const targetValue = formatMobileNumber(e.target.value)
    setPhone(targetValue)
  }

  const nameChangeHandler = e => {
    setError(null)
    setName(e.target.value)
  }

  const productImage = item?.cover?.url ? `${PHOTO_URL}${item.cover.url}` : ''

  return (
    <CSSTransition
      in={openBuyPopup}
      classNames="fadeBg"
      timeout={300}
      unmountOnExit
    >
      {() => (
        <Wrapper>
          <PopupWrapper ref={popupRef}>
            <CloseButton onClick={closePopup} />
            <PopupContent>
              <Left>
                <Image
                  src={
                    !!productImage ? productImage : '/cosmetic_placeholder.jpg'
                  }
                />
              </Left>
              <Right>
                {loading ? (
                  <RotatingLoader />
                ) : !success ? (
                  <>
                    <Title>
                      {`${
                        me?.info ? 'Проверьте данные формы' : 'Заполните форму'
                      }, чтобы наш менеджер связался с Вами по
                      поводу заказа`}
                    </Title>
                    <PopupInput
                      type="text"
                      required
                      placeholder="Имя"
                      value={name || me?.info?.username || ''}
                      onChange={nameChangeHandler}
                    />
                    <PhoneInputWrap>
                      <PhoneCode>+7</PhoneCode>
                      <PopupInput
                        type="tel"
                        required
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={phoneChangeHandler}
                        maxLength={13}
                      />
                    </PhoneInputWrap>
                    <TitleWrap>
                      <ProductDescription>
                        {item?.shortDescription}
                      </ProductDescription>
                    </TitleWrap>
                    <PriceWrap>
                      <Description>Сумма заказа: </Description>
                      <Price>{`${
                        (item?.salePrice &&
                          item?.salePrice.toLocaleString() * productQuantity) ||
                        item?.regularPrice?.toLocaleString() * productQuantity
                      } ₽`}</Price>
                    </PriceWrap>
                    <QuantityWrap>
                      <Description>Количество: </Description>
                      <QuantityButtons>
                        <Minus onClick={decreaseQuantity} />
                        <Quantity>{`${productQuantity} упк.`}</Quantity>
                        <Plus onClick={increaseQuantity} />
                      </QuantityButtons>
                    </QuantityWrap>
                    <Error>{error ? error : ''}</Error>
                    <ButtonPopup onClick={buyProduct} variant="red">
                      Отправить заказ
                    </ButtonPopup>
                  </>
                ) : (
                  <Success>
                    Спасибо за Ваш заказ!
                    <br /> В ближайшее время с Вами свяжется наш менеджер
                  </Success>
                )}
              </Right>
            </PopupContent>
          </PopupWrapper>
        </Wrapper>
      )}
    </CSSTransition>
  )
}

export default FastBuyPopup
