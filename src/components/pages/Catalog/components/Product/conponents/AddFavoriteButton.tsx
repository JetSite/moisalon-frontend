import { FC, MouseEvent, useEffect, useState } from 'react'
import * as Styled from '../style'
import HeartFullFill from '../../../../MainPage/components/Header/icons/HeartFullFill'
import { favoritesInStorage, inStorage } from 'src/utils/favoritesInStorage'
import { IProduct } from 'src/types/product'

interface Props {
  item: IProduct
}

export const AddFavoriteButton: FC<Props> = ({ item }) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('products', {
      ...item,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e: MouseEvent<HTMLButtonElement>, item: IProduct) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('products', {
      ...item,
      dontShowPrice: item?.brand?.dontShowPrice,
    })
    setIsFavorit(!isFavorite)
  }
  return (
    <Styled.Favorite onClick={e => addFavorite(e, item)}>
      <HeartFullFill fill={isFavorite} />
    </Styled.Favorite>
  )
}
