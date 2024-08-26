import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import { Image, Item, Favorite } from '../styled'
import { PHOTO_URL } from '../../../../../api/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../../styles/variables'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'

interface Props {
  brand: IBrand
  setDeleteItem: ISetState<boolean>
  deleteItem: boolean
  handleDeleted?: ISetState<boolean>
}

const BrandItem: FC<Props> = ({
  brand,
  setDeleteItem,
  handleDeleted,
  deleteItem,
}) => {
  const addFavorite = (e: MouseEvent<HTMLDivElement>, brand: IBrand) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('brands', brand)
    setDeleteItem(!deleteItem)
    handleDeleted && handleDeleted(true)
  }

  return (
    <Item>
      <Image alt="logoBrand" src={PHOTO_URL + brand.logo.url} />
      <Favorite onClick={e => addFavorite(e, brand)}>
        <HeartFullFill fill={red} />
      </Favorite>
    </Item>
  )
}

export default BrandItem
