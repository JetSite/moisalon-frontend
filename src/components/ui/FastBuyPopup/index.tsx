import {
  useState,
  useRef,
  useEffect,
  FC,
  RefObject,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { PHOTO_URL } from '../../../api/variables'
import { CSSTransition } from 'react-transition-group'
import { formatMobileNumber } from '../../../utils/formatMobileNumber'
import * as Styled from './styles'
import RotatingLoader from '../RotatingLoader'
import { IUser } from 'src/types/me'
import { IProduct } from 'src/types/product'
import { ISetState } from 'src/types/common'
import { CREATE_ORDER } from 'src/api/graphql/order/mutations/createOrder'

interface Props {
  user: IUser | null
  item: IProduct
  openBuyPopup: boolean
  setOpenBuyPopup: ISetState<boolean>
}

const FastBuyPopup: FC<Props> = ({
  item,
  openBuyPopup,
  setOpenBuyPopup,
  user,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user?.info) return

    if (user.info.username) {
      setName(user.info.username)
    }
    if (user.info.phone) {
      setPhone(formatMobileNumber(user.info.phone))
    }
  }, [user])

  const useOutsideClick = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
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

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
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
    createOrder({
      variables: {
        data: {
          title: 'Bay one click',
          total: item.salePrice
            ? item.salePrice * quantity
            : item.regularPrice * quantity,
          user: user?.info.id || null,
          contactName: name,
          contactPhone: phone,
          order_status: 8,
          cartContent: [{ product: item.id, quantity }],
        },
      },
    })
  }

  const closePopup: MouseEventHandler<HTMLButtonElement> = e => {
    setOpenBuyPopup(false)
    setSuccess(false)
    setQuantity(1)
    setError(null)
    setName(user?.info?.username ? user?.info?.username : '')
    setPhone(
      user?.info?.phone ? formatMobileNumber(user.info.phone.substring(1)) : '',
    )
  }

  const increaseQuantity = () => {
    if (item.availableInStock <= quantity) return
    setQuantity(prevState => prevState + 1)
  }

  const decreaseQuantity = () => {
    if (quantity === 1) return
    setQuantity(prevState => prevState - 1)
  }

  const phoneChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setError(null)
    const targetValue = formatMobileNumber(e.target.value)
    setPhone(targetValue)
  }

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
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
        <Styled.Wrapper>
          <Styled.PopupWrapper ref={popupRef}>
            <Styled.CloseButton onClick={closePopup} />
            <Styled.PopupContent>
              <Styled.Left>
                <Styled.Image
                  src={
                    !!productImage ? productImage : '/cosmetic_placeholder.jpg'
                  }
                />
              </Styled.Left>
              <Styled.Right>
                {loading ? (
                  <RotatingLoader />
                ) : !success ? (
                  <>
                    <Styled.Title>
                      {`${
                        user?.info
                          ? 'Проверьте данные формы'
                          : 'Заполните форму'
                      }, чтобы наш менеджер связался с Вами по
                      поводу заказа`}
                    </Styled.Title>
                    <Styled.PopupInput
                      type="text"
                      required
                      placeholder="Имя"
                      value={name || user?.info?.username || ''}
                      onChange={nameChangeHandler}
                    />
                    <Styled.PhoneInputWrap>
                      <Styled.PhoneCode>+7</Styled.PhoneCode>
                      <Styled.PopupInput
                        type="tel"
                        required
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={phoneChangeHandler}
                        maxLength={13}
                      />
                    </Styled.PhoneInputWrap>
                    <Styled.TitleWrap>
                      <Styled.ProductDescription>
                        {item?.shortDescription}
                      </Styled.ProductDescription>
                      {item?.availableInStock ? (
                        <Styled.ProductDescription>
                          {`Количество доступно для заказа: ${item?.availableInStock} упк.`}
                        </Styled.ProductDescription>
                      ) : null}
                    </Styled.TitleWrap>
                    <Styled.PriceWrap>
                      <Styled.Description>Сумма заказа: </Styled.Description>
                      <Styled.Price>{`${
                        (item.salePrice &&
                          (item.salePrice * quantity).toLocaleString()) ||
                        (item.regularPrice * quantity).toLocaleString()
                      } ₽`}</Styled.Price>
                    </Styled.PriceWrap>
                    <Styled.QuantityWrap>
                      <Styled.Description>Количество: </Styled.Description>
                      <Styled.QuantityButtons>
                        <Styled.Minus
                          disabled={1 === quantity}
                          onClick={decreaseQuantity}
                        />
                        <Styled.Quantity>{`${quantity} упк.`}</Styled.Quantity>
                        <Styled.Plus
                          disabled={item.availableInStock <= quantity}
                          onClick={increaseQuantity}
                        />
                      </Styled.QuantityButtons>
                    </Styled.QuantityWrap>
                    <Styled.Error>{error ? error : ''}</Styled.Error>
                    <Styled.ButtonPopup onClick={buyProduct} variant="red">
                      Отправить заказ
                    </Styled.ButtonPopup>
                  </>
                ) : (
                  <Styled.Success>
                    Спасибо за Ваш заказ!
                    <br /> В ближайшее время с Вами свяжется наш менеджер
                  </Styled.Success>
                )}
              </Styled.Right>
            </Styled.PopupContent>
          </Styled.PopupWrapper>
        </Styled.Wrapper>
      )}
    </CSSTransition>
  )
}

export default FastBuyPopup
