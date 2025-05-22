import { useState, FC } from 'react'
import * as Styled from './style'
import Link from 'next/link'
import { PHOTO_URL } from '../../../../../api/variables'
import FastBuyPopup from '../../../../ui/FastBuyPopup'
import { AddFavoriteButton } from './conponents/AddFavoriteButton'
import {
  IQuantityControlsProps,
  QuantityControls,
} from './conponents/QuantityControls'

export interface IProductProps
  extends Omit<IQuantityControlsProps, 'setOpenBuyPopup'> {
  loadingItems: boolean
}

const Product: FC<IProductProps> = ({
  item,
  user,
  quantity,
  cartItem,
  addToCart,
  deleteFromCart,
  loadingItems = false,
}) => {
  const [openBuyPopup, setOpenBuyPopup] = useState(false)

  const productImage = cartItem.product?.cover?.url
    ? `${PHOTO_URL}${cartItem.product.cover.url}`
    : ''

  return loadingItems ? (
    <Styled.SkeletonItem variant="rect" />
  ) : (
    <li>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={cartItem?.product}
        user={user}
      />
      <Link
        shallow
        href={`/${cartItem.product.brand.city.slug}/product/${cartItem.product.id}`}
      >
        <Styled.Wrapper id={item.id}>
          <Styled.ImageWrapper>
            <Styled.Image
              alt="image"
              src={productImage ? productImage : '/cosmetic_placeholder.jpg'}
              width={200}
              height={140}
            />
            <AddFavoriteButton item={item} />
          </Styled.ImageWrapper>
          <Styled.Content>
            <Styled.Name>{cartItem?.product?.name}</Styled.Name>
            <Styled.Available avaible={cartItem?.product?.availableInStock > 0}>
              {cartItem?.product?.availableInStock > 0
                ? 'В наличии'
                : 'Нет в наличии'}
            </Styled.Available>
            <Styled.Description>
              {cartItem?.product?.shortDescription}
            </Styled.Description>

            {item?.sku ? (
              <Styled.ProductDetails>
                <Styled.Detail>Артикул: {item?.sku}</Styled.Detail>
              </Styled.ProductDetails>
            ) : null}
            {cartItem.product?.brand?.dontShowPrice && !user?.info ? null : (
              <Styled.Price>
                <Styled.NewPrice>
                  {cartItem?.product?.salePrice
                    ? `${
                        (cartItem?.product?.salePrice &&
                          cartItem?.product?.salePrice) ||
                        cartItem?.product?.salePrice
                      } ₽`
                    : 'Цена по запросу'}{' '}
                </Styled.NewPrice>
                {cartItem?.product?.regularPrice !== 0 ? (
                  <Styled.OldPrice>
                    {`${
                      (cartItem?.product?.regularPrice &&
                        cartItem?.product?.regularPrice) ||
                      cartItem?.product?.regularPrice
                    } ₽`}
                  </Styled.OldPrice>
                ) : null}
              </Styled.Price>
            )}
            <QuantityControls
              quantity={quantity}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
              cartItem={cartItem}
              setOpenBuyPopup={setOpenBuyPopup}
              item={item}
              user={user}
            />
          </Styled.Content>
        </Styled.Wrapper>
      </Link>
    </li>
  )
}

export default Product
