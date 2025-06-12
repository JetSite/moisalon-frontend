import { FC } from 'react'
import * as Styled from '../style'
import { IProduct, IProductCart } from 'src/types/product'
import { Minus, Plus } from 'src/components/ui/FastBuyPopup/styles'
import { IUser } from 'src/types/me'
import { ISetState } from 'src/types/common'
import Button from 'src/components/newUI/buttons/Button'

const ComponentsMap = {
  card: Styled.ButtonCart,
  page: Button,
}

export type IQuantityControlsType = 'card' | 'page'

export interface IQuantityControlsProps {
  quantity: number
  addToCart: (item: IProduct, boolean: boolean) => void
  deleteFromCart: (item: IProduct, boolean?: boolean) => void
  item: IProduct
  cartItem: IProductCart
  user: IUser | null
  setOpenBuyPopup: ISetState<boolean>
  type?: IQuantityControlsType
}

export const QuantityControls: FC<IQuantityControlsProps> = ({
  quantity,
  cartItem,
  setOpenBuyPopup,
  addToCart,
  deleteFromCart,
  item,
  type = 'card',
}) => {
  const ButtonComponent = ComponentsMap[type] || Styled.ButtonCart

  return quantity === 0 && cartItem.quantity === 0 ? (
    <Styled.ButtonsWrapper type={type}>
      <ButtonComponent
        variant="red"
        size="fullWidth"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setOpenBuyPopup(true)
        }}
        disabled={
          !cartItem?.product?.availableInStock ||
          cartItem?.product?.availableInStock === 0
        }
      >
        Заказать
      </ButtonComponent>
      <ButtonComponent
        variant="red"
        size="fullWidth"
        disabled={
          !cartItem?.product?.availableInStock ||
          cartItem?.product?.availableInStock === 0
        }
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          addToCart(cartItem.product, true)
        }}
      >
        В корзину
      </ButtonComponent>
    </Styled.ButtonsWrapper>
  ) : (
    <Styled.QuantityWrap>
      <Minus
        disabled={quantity === 0}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          deleteFromCart(cartItem.product)
        }}
      />
      <Styled.Quantity>{`${quantity} шт.`}</Styled.Quantity>
      <Plus
        disabled={quantity === item.availableInStock}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          addToCart(cartItem.product, true)
        }}
      />
    </Styled.QuantityWrap>
  )
}
