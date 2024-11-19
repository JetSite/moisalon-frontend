import parseToFloat from '../../../../../utils/parseToFloat'
import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import {
  WrapperItem,
  TopGoodWrapper,
  BottomGoodWrapper,
  Image,
  Favorite,
  Wrap,
  Name,
  Price,
  NewPrice,
  OldPrice,
} from '../styled'
import { PHOTO_URL } from '../../../../../api/variables'
import { red } from '../../../../../styles/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { FC, MouseEvent } from 'react'
import { IProduct } from 'src/types/product'
import { ISetState } from 'src/types/common'

interface Props {
  product: IProduct
  cabinet: boolean
  deleteItem: boolean
  setDeleteItem: ISetState<boolean>
}

const Good: FC<Props> = ({
  product,
  deleteItem,
  setDeleteItem,
  cabinet = false,
}) => {
  const { me } = useAuthStore(getStoreData)
  const addFavorite = (e: MouseEvent<HTMLDivElement>, product: IProduct) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('products', product)
    setDeleteItem(!deleteItem)
  }

  return (
    <WrapperItem cabinet={cabinet}>
      <TopGoodWrapper>
        <Image
          alt="image"
          src={
            product?.cover
              ? `${PHOTO_URL}${product?.cover.url}`
              : '/cosmetic_placeholder.jpg'
          }
        />
        <Favorite onClick={e => addFavorite(e, product)}>
          <HeartFullFill fill={red} />
        </Favorite>
      </TopGoodWrapper>
      <BottomGoodWrapper>
        <Wrap>
          <Name>{product?.name}</Name>
          {!me?.info ? null : (
            <Price>
              <NewPrice>
                {product?.salePrice
                  ? `${product?.salePrice.toLocaleString()} ₽`
                  : 'Цена по запросу'}
                <OldPrice>
                  {product?.regularPrice
                    ? `${product?.regularPrice.toLocaleString()}₽`
                    : null}
                </OldPrice>
              </NewPrice>
            </Price>
          )}
        </Wrap>
      </BottomGoodWrapper>
    </WrapperItem>
  )
}

export default Good
