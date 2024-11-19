import { useState, useEffect, FC } from 'react'
import * as Styled from './styled'
import Link from 'next/link'
import { PHOTO_URL } from '../../../../api/variables'
import { pluralize } from '../../../../utils/pluralize'
import CheckboxStyled from 'src/components/newUI/Inputs/Checkbox'
import { ISetState } from 'src/types/common'
import { IProductCart } from 'src/types/product'
import { IProductProps } from '../../Catalog/components/Product'
import { Minus, Plus } from 'src/components/ui/FastBuyPopup/styles'
import { ICity } from 'src/types'
import DOMPurify from 'dompurify'

interface Props extends IProductProps {
  selectedProducts: IProductCart[]
  setSelectedProducts: ISetState<IProductCart[]>
  city: ICity
}

const Product: FC<Props> = ({
  item,
  quantity,
  cartItem,
  addToCart,
  deleteFromCart,
  selectedProducts,
  setSelectedProducts,
  city,
}) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (selectedProducts?.find(el => el.product.id === item.id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [selectedProducts])

  const handleChecked = () => {
    if (selectedProducts?.find(el => el.product.id === item.id)) {
      setSelectedProducts(
        selectedProducts.filter(el => el.product.id !== item.id),
      )
    } else {
      setSelectedProducts([...selectedProducts, cartItem])
    }
  }

  return (
    <Styled.Wrapper>
      <Styled.Top>
        <Link href={`/${city.slug}/product/${item?.id}`}>
          <Styled.ImagePlaceholder>
            <img
              src={
                item?.cover?.url
                  ? ` ${PHOTO_URL}${item.cover.url}`
                  : '/cosmetic_placeholder.jpg'
              }
              alt="logo"
            />
          </Styled.ImagePlaceholder>
        </Link>
        <Styled.Info>
          <Styled.Name>{item.name}</Styled.Name>
          <Styled.Description
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.shortDescription || ''),
            }}
          />
          <Styled.PriceQuantityWrapper>
            <Styled.Price>
              {(item.salePrice && item.salePrice.toLocaleString()) ||
                item.regularPrice.toLocaleString()}
              ₽
            </Styled.Price>
            <Styled.AvailableQuantity
              isWrongQuantity={quantity > item.availableInStock}
            >
              {`${item.availableInStock} ${pluralize(
                item.availableInStock || 0,
                'упаковка',
                'упаковки',
                'упаковок',
              )} в наличии`}
            </Styled.AvailableQuantity>
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
      </Styled.Controls>
    </Styled.Wrapper>
  )
}

export default Product
