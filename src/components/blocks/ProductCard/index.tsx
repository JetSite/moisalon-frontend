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
import { IProduct } from 'src/types/product'

interface Props {
  item: IProduct
  loading?: boolean
}

const ProductCard: FC<Props> = ({ item, loading }) => {
  const [isFavorite, setIsFavorit] = useState(false)
  const { city, me } = useAuthStore(getStoreData)

  const addFavorite = (e: MouseEvent<HTMLButtonElement>, item: IProduct) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorit(!isFavorite)
    favoritesInStorage('products', item)
  }

  const imageLink = item?.cover?.url ? `${PHOTO_URL}${item.cover.url}` : ''

  return (
    <Wrapper>
      <TopGoodWrapper>
        <Image alt="image" src={imageLink || '/cosmetic_placeholder.jpg'} />
        <Favorite onClick={e => addFavorite(e, item)}>
          <HeartFullFill fill={isFavorite} />
        </Favorite>
      </TopGoodWrapper>
      <BottomGoodWrapper>
        <Wrap>
          <Name>{item.name as unknown as string}</Name>
          {item.brand.dontShowPrice && !me?.info ? null : (
            <Price>
              <NewPrice>
                {item.salePrice
                  ? `${(item.salePrice && item.salePrice) || item.salePrice} ₽`
                  : 'Цена по запросу'}{' '}
              </NewPrice>
              {(item.regularPrice as unknown as number) !== 0 ? (
                <OldPrice>
                  {`${
                    (item.regularPrice && item.regularPrice) ||
                    item.regularPrice
                  } ₽`}
                </OldPrice>
              ) : null}
            </Price>
          )}
        </Wrap>
        {/* {loadingCart ? (
            <SkeletonBottom />
          ) : item?.quantity === 0 ? (
            <ButtonsWrapper>
              <ButtonCart
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  chooseProductOneClick(item)
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
                    !addLoading ? add(item?.product, 1) : {}
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
                  !deleteLoading ? deleteItem(item) : {}
                }}
              />
              <Quantity>{`${item?.quantity} шт.`}</Quantity>
              <Plus
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  !addLoading ? add(item?.product, 1) : {}
                }}
              />
            </QuantityWrap>
          )} */}
      </BottomGoodWrapper>
    </Wrapper>
  )
}

export default ProductCard
