import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CityContext, MeContext } from '../../../searchContext'
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
  SkeletonBottom,
  ButtonCart,
  QuantityWrap,
  Quantity,
  Plus,
  Minus,
  Favorite,
  ButtonsWrapper,
} from './styles'
import { PHOTO_URL } from '../../../variables'
import { cyrToTranslit } from '../../../utils/translit'
import {
  inStorage,
  favoritesInStorage,
} from '../../../utils/favoritesInStorage'
import { red } from '../../../styles/variables'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'

const ProductCard = ({
  item,
  loading,
  add,
  addLoading,
  deleteLoading,
  deleteItem,
  loadingCart,
  cart,
  chooseProductOneClick,
}) => {
  const router = useRouter()
  const [me] = useContext(MeContext)
  const [city] = useContext(CityContext)
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
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

  const imageLink = item?.productCover?.url
    ? `${PHOTO_URL}${item.productCover.url}`
    : ''

  const newItem = cart?.find(el => el?.product?.id === item.id)
    ? cart?.find(el => el?.product?.id === item.id)
    : { product: { ...item }, quantity: 0 }
  return loading ? (
    <SkeletonItem variant="rectangular" />
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
          <Favorite isFavorite={isFavorite} onClick={e => addFavorite(e, item)}>
            <HeartFullFill fill={isFavorite} />
          </Favorite>
        </TopGoodWrapper>
        <BottomGoodWrapper>
          <Wrap>
            <Name>{newItem?.product?.productName}</Name>
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
                {newItem?.product?.productPrice !== 0 ? (
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
