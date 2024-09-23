import { useState, useEffect, FC } from 'react'
import * as Styled from './style'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../utils/favoritesInStorage'
import { PHOTO_URL } from '../../../../../api/variables'
import FastBuyPopup from '../../../../ui/FastBuyPopup'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

interface Props {}

const Product: FC<Props> = ({
  item,
  cart,
  me,
  addToCart,
  deleteFromCart,
  catalog,
  loadingItems = false,
  loadingBottom = false,
  brand,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  const [openBuyPopup, setOpenBuyPopup] = useState(false)

  const newItem = cart?.cartContent?.find(el => el?.product?.id === item.id)
    ? cart?.cartContent?.find(el => el?.product?.id === item.id)
    : { product: { ...item }, quantity: 0 }

  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('products', {
      ...item,
      dontShowPrice: brand?.dontShowPrice,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
    })
    setIsFavorit(!isFavorite)
  }

  const productImage = newItem.product?.cover?.url
    ? `${PHOTO_URL}${newItem.product.cover.url}`
    : ''

  return loadingItems ? (
    <Styled.SkeletonItem variant="rectangular" />
  ) : (
    <>
      <FastBuyPopup
        openBuyPopup={openBuyPopup}
        setOpenBuyPopup={setOpenBuyPopup}
        item={newItem?.product}
        me={me}
      />
      <Link
        href={{
          pathname: `/${city.slug}/product/${newItem?.product?.id}`,
          query: {
            catalog,
          },
        }}
      >
        <Styled.Wrapper id={item.id}>
          <Styled.ImageWrapper>
            <Styled.Image
              alt="image"
              src={!!productImage ? productImage : '/cosmetic_placeholder.jpg'}
            />
            <Styled.Favorite
              isFavorite={isFavorite}
              onClick={e => addFavorite(e, item)}
            >
              <HeartFullFill fill={isFavorite} />
            </Styled.Favorite>
          </Styled.ImageWrapper>
          <Styled.Content>
            <Styled.Name>{newItem?.product?.name}</Styled.Name>
            <Styled.Available avaible={newItem?.product?.availableInStock > 0}>
              {newItem?.product?.availableInStock > 0
                ? 'В наличии'
                : 'Нет в наличии'}
            </Styled.Available>
            <Styled.Description>
              {newItem?.product?.shortDescription}
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
            {newItem?.product?.brand?.dontShowPrice && !me?.info ? null : (
              <Styled.Price>
                <Styled.NewPrice>
                  {newItem?.product?.salePrice
                    ? `${
                        (newItem?.product?.salePrice &&
                          newItem?.product?.salePrice) ||
                        newItem?.product?.salePrice
                      } ₽`
                    : 'Цена по запросу'}{' '}
                </Styled.NewPrice>
                {newItem?.product?.regularPrice !== 0 ? (
                  <Styled.OldPrice>
                    {`${
                      (newItem?.product?.regularPrice &&
                        newItem?.product?.regularPrice) ||
                      newItem?.product?.regularPrice
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
            {loadingBottom && newItem?.product?.availableInStock ? (
              <Styled.SkeletonBottom />
            ) : newItem?.quantity === 0 ? (
              <Styled.ButtonsWrapper>
                <Styled.ButtonCart
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setOpenBuyPopup(true)
                  }}
                  disabled={
                    !newItem?.product?.availableInStock ||
                    newItem?.product?.availableInStock === 0
                  }
                >
                  Заказать
                </Styled.ButtonCart>
                <Styled.ButtonCart
                  disabled={
                    !newItem?.product?.availableInStock ||
                    newItem?.product?.availableInStock === 0
                  }
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!me?.info) {
                      router.push(
                        {
                          pathname: '/login',
                          query: { error: 'notAuthorized' },
                        },
                        '/login',
                      )
                    } else {
                      !loadingBottom ? addToCart(newItem?.product, 1) : {}
                    }
                  }}
                >
                  В корзину
                </Styled.ButtonCart>
              </Styled.ButtonsWrapper>
            ) : (
              <Styled.QuantityWrap>
                <Styled.Minus
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    !loadingBottom ? deleteFromCart(newItem) : {}
                  }}
                />
                <Styled.Quantity>{`${newItem?.quantity} шт.`}</Styled.Quantity>
                <Styled.Plus
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    !loadingBottom ? addToCart(newItem?.product, 1) : {}
                  }}
                />
              </Styled.QuantityWrap>
            )}
          </Styled.Content>
        </Styled.Wrapper>
      </Link>
    </>
  )
}

export default Product
