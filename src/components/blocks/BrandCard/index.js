import { useState, useEffect } from 'react'
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
import { PHOTO_URL } from '../../../../variables'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../styles/variables'

const BrandItem = ({
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

  const logoUrl = brand?.attributes?.brandLogo?.data?.attributes?.url
    ? `${PHOTO_URL}${brand?.attributes?.brandLogo?.data?.attributes?.url}`
    : ''

  const addFavorite = (e, brand) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('brands', brand)
    setIsFavorit(!isFavorite)
  }
  return loading ? (
    <SkeletonItem variant="rectangular" />
  ) : (
    <BItem type={type} id={brand.id}>
      <BrandImage alt="logoBrand" src={logoUrl} />
      {!isEditing ? (
        <Favorite isFavorite={isFavorite} onClick={e => addFavorite(e, brand)}>
          <HeartFullFill fill={isFavorite} />
        </Favorite>
      ) : null}
      <BrandShareWrap>
        <Share link={shareLink} title={brand?.attributes?.brandName} />
      </BrandShareWrap>
      {children}
    </BItem>
  )
}

export default BrandItem
