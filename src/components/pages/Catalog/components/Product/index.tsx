import { useState, FC } from 'react'
import * as Styled from './style'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PHOTO_URL } from '../../../../../api/variables'
import FastBuyPopup from '../../../../ui/FastBuyPopup'
import { AddFavoriteButton } from './conponents/AddFavoriteButton'
import { IProduct, IProductCart } from 'src/types/product'
import { IUser } from 'src/types/me'
import { Minus, Plus } from 'src/components/ui/FastBuyPopup/styles'

interface Props {
  item: IProduct
  cartItem: IProductCart
  user: IUser | null
  quantity: number
  addToCart: (item: IProduct, boolean: boolean) => void
  deleteFromCart: (item: IProduct, boolean?: boolean) => void
  loadingItems: boolean
}

const Product: FC<Props> = ({
  item,
  user,
  quantity,
  cartItem,
  addToCart,
  deleteFromCart,
  loadingItems = false,
}) => {
  const router = useRouter()
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
              src={!!productImage ? productImage : '/cosmetic_placeholder.jpg'}
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
            <Styled.ProductDetails>
              {item?.sku ? (
                <Styled.Detail>Артикул: {item?.sku}</Styled.Detail>
              ) : null}
              {/* {item?.material ? (
                <Detail>Материал: {item?.material}</Detail>
              ) : null} */}
              {/* {item?.color ? <Detail>Цвет: {item?.color}</Detail> : null}
              {item?.size ? <Detail>Размер: {item?.size}</Detail> : null} */}
            </Styled.ProductDetails>
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
            {/* {item?.quantityInPac ? (
              <QuantityInPack>{item?.quantityInPac}</QuantityInPack>
            ) : (
              <QuantityInPack></QuantityInPack>
            )} */}
            {
              // !cartItem.product.availableInStock ? (
              //   <Styled.SkeletonBottom />
              // ) :
              quantity === 0 && cartItem.quantity === 0 ? (
                <Styled.ButtonsWrapper>
                  <Styled.ButtonCart
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
                  </Styled.ButtonCart>
                  <Styled.ButtonCart
                    disabled={
                      !cartItem?.product?.availableInStock ||
                      cartItem?.product?.availableInStock === 0
                    }
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!user?.info) {
                        router.push('/login')
                      } else {
                        addToCart(cartItem.product, true)
                      }
                    }}
                  >
                    В корзину
                  </Styled.ButtonCart>
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
          </Styled.Content>
        </Styled.Wrapper>
      </Link>
    </li>
  )
}

export default Product
