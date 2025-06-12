import { FC, useState, useEffect } from 'react'
import * as Styled from './styled'
import { PHOTO_URL } from '../../../../api/variables'
import { IGuestCartItem } from 'src/utils/guestCart'
import { LazyImage } from '@/components/newUI/common/LazyIMage'
import useCartStore from 'src/store/cartStore'
import { Minus, Plus } from 'src/components/ui/FastBuyPopup/styles'
import CheckboxStyled from 'src/components/newUI/Inputs/Checkbox'
import { ISetState } from 'src/types/common'

interface IGuestCartProductProps {
  item: IGuestCartItem
  selectedItems: IGuestCartItem[]
  setSelectedItems: ISetState<IGuestCartItem[]>
}

const GuestCartProduct: FC<IGuestCartProductProps> = ({
  item,
  selectedItems,
  setSelectedItems,
}) => {
  const { updateCartItemQuantity, removeFromCart } = useCartStore()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (selectedItems?.find(el => el.productId === item.productId)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [selectedItems, item.productId])

  const handleChecked = () => {
    if (selectedItems?.find(el => el.productId === item.productId)) {
      setSelectedItems(
        selectedItems.filter(el => el.productId !== item.productId),
      )
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedItems(
        selectedItems.filter(el => el.productId !== item.productId),
      )
      removeFromCart(item.productId)
    } else {
      updateCartItemQuantity(item.productId, newQuantity)
    }
  }

  const productImage = item.image
    ? `${PHOTO_URL}${item.image}`
    : '/cosmetic_placeholder.jpg'

  return (
    <Styled.Wrapper>
      <Styled.Top>
        <Styled.ImagePlaceholder>
          <LazyImage src={productImage} alt={item.name} />
        </Styled.ImagePlaceholder>
        <Styled.Info>
          <Styled.Name>{item.name}</Styled.Name>
          {item.brand && <Styled.Description>{item.brand}</Styled.Description>}
          <Styled.PriceQuantityWrapper>
            <Styled.Price>{item.price} ₽</Styled.Price>
          </Styled.PriceQuantityWrapper>
        </Styled.Info>
      </Styled.Top>
      <Styled.Controls>
        <CheckboxStyled
          checked={checked}
          onClick={() => {
            handleChecked()
          }}
        />
        <Styled.QuantityWrap>
          <Minus
            disabled={item.quantity <= 1}
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            -
          </Minus>
          <Styled.Quantity>{item.quantity} шт.</Styled.Quantity>
          <Plus onClick={() => handleQuantityChange(item.quantity + 1)}>+</Plus>
        </Styled.QuantityWrap>
      </Styled.Controls>
    </Styled.Wrapper>
  )
}

export default GuestCartProduct
