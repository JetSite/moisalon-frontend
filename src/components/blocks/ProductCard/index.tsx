import { useState, useEffect, FC, MouseEvent } from 'react'
import Link from 'next/link'
import {
  Wrapper,
  TopGoodWrapper,
  Image,
  BottomGoodWrapper,
  Wrap,
  Name,
  Price,
  NewPrice,
  OldPrice,
  Favorite,
  SkeletonItem,
} from './styles'
import { PHOTO_URL } from '../../../api/variables'
import { cyrToTranslit } from '../../../utils/translit'
import {
  inStorage,
  favoritesInStorage,
} from '../../../utils/favoritesInStorage'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { LazyType } from 'src/types/common'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

interface Props {
  item: LazyType
  loading: boolean
  cart: LazyType[]
}

const ProductCard: FC<Props> = ({ item, loading, cart }) => {
  const [isFavorite, setIsFavorit] = useState(false)
  const { city, me } = useAuthStore(getStoreData)

  useEffect(() => {
    const isInStorage = inStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e: MouseEvent<HTMLButtonElement>, item: LazyType) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
    })
    setIsFavorit(!isFavorite)
  }

  const imageLink = item?.productCover?.url
    ? `${PHOTO_URL}${item.productCover.url}`
    : ''

  const newItem = cart?.find(el => el?.product?.id === item.id)
    ? cart?.find(el => el?.product?.id === item.id)
    : { product: { ...item }, quantity: 0 }
  return loading ? (
    <SkeletonItem
    // variant="rectangular"
    />
  ) : (
    <Link
      href={{
        pathname: `/${cyrToTranslit(city)}/product/${newItem?.product?.id}`,
        query: {
          catalog: false,
        },
      }}
    >
      <Wrapper>
        <TopGoodWrapper>
          <Image alt="image" src={imageLink || '/cosmetic_placeholder.jpg'} />
          <Favorite
            // isFavorite={isFavorite} TODO: div cange to button
            onClick={e => addFavorite(e, item)}
          >
            <HeartFullFill fill={isFavorite} />
          </Favorite>
        </TopGoodWrapper>
        <BottomGoodWrapper>
          <Wrap>
            <Name>{newItem?.product?.productName as unknown as string}</Name>
            {newItem?.product?.brand?.dontShowPrice && !me?.info ? null : (
              <Price>
                <NewPrice>
                  {newItem?.product?.productSalePrice
                    ? `${
                        (newItem?.product?.productSalePrice &&
                          newItem?.product?.productSalePrice) ||
                        newItem?.product?.productSalePrice
                      } ₽`
                    : 'Цена по запросу'}{' '}
                </NewPrice>
                {(newItem?.product?.productPrice as unknown as number) !== 0 ? (
                  <OldPrice>
                    {`${
                      (newItem?.product?.productPrice &&
                        newItem?.product?.productPrice) ||
                      newItem?.product?.productPrice
                    } ₽`}
                  </OldPrice>
                ) : null}
              </Price>
            )}
          </Wrap>
          {/* {loadingCart ? (
            <SkeletonBottom />
          ) : newItem?.quantity === 0 ? (
            <ButtonsWrapper>
              <ButtonCart
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  chooseProductOneClick(newItem)
                }}
              >
                Заказать
              </ButtonCart>
              <ButtonCart
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
                    !addLoading ? add(newItem?.product, 1) : {}
                  }
                }}
              >
                В корзину
              </ButtonCart>
            </ButtonsWrapper>
          ) : (
            <QuantityWrap>
              <Minus
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  !deleteLoading ? deleteItem(newItem) : {}
                }}
              />
              <Quantity>{`${newItem?.quantity} шт.`}</Quantity>
              <Plus
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  !addLoading ? add(newItem?.product, 1) : {}
                }}
              />
            </QuantityWrap>
          )} */}
        </BottomGoodWrapper>
      </Wrapper>
    </Link>
  )
}

export default ProductCard
