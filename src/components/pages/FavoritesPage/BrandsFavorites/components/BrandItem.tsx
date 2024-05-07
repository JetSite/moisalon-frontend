import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import { Image, Item, Favorite } from '../styled'
import { PHOTO_URL } from '../../../../../api/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../../styles/variables'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { IBrand } from 'src/types/brands'

interface Props {
  brand: IBrand
  setDeleteItem: Dispatch<SetStateAction<boolean>>
  deleteItem: boolean
  handleDeleted?: () => void
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
    setDeleteItem(!deleteItem)
    handleDeleted && handleDeleted()
  }
  return (
    <Item>
      <Image alt="logoBrand" src={PHOTO_URL + brand.brandLogo.url} />
      <Favorite onClick={e => addFavorite(e, brand)}>
        <HeartFullFill fill={red} />
      </Favorite>
    </Item>
  )
}

export default BrandItem
