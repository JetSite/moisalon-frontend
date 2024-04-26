import { useState, useEffect, FC, MouseEvent } from 'react'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import {
  BItem,
  BrandImage,
  Favorite,
  SkeletonItem,
  BrandShareWrap,
} from './styles'
import Share from '../../ui/Share'
import { PHOTO_URL } from '../../../variables'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { IChildren } from 'src/types/common'
import { IBrand } from 'src/types/brands'

interface Props {
  brand: IBrand
  loading?: boolean
  shareLink: string
  children?: IChildren
  isEditing?: boolean
  type?: string
}

const BrandItem: FC<Props> = ({
  brand,
  loading,
  shareLink,
  children,
  isEditing = false,
  type = 'slider',
}) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('brands', brand)
    setIsFavorit(!!isInStorage)
  }, [])

  const logoUrl = brand?.brandLogo?.url
    ? `${PHOTO_URL}${brand.brandLogo.url}`
    : ''

  const addFavorite = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    brand: IBrand,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('brands', brand)
    setIsFavorit(!isFavorite)
  }
  return loading ? (
    <SkeletonItem />
  ) : (
    <BItem type={type} id={brand.id}>
      <BrandImage alt="logoBrand" src={logoUrl} />
      {!isEditing ? (
        <Favorite onClick={e => addFavorite(e, brand)}>
          <HeartFullFill fill={isFavorite} />
        </Favorite>
      ) : null}
      <BrandShareWrap>
        <Share link={shareLink} title={brand?.brandName} />
      </BrandShareWrap>
      {children}
    </BItem>
  )
}

export default BrandItem
