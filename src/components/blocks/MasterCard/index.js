import { useState, useEffect } from 'react'
import { getServicesCategories } from '../../../utils/serviceCatalog'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import Share from '../../ui/Share'
import Rating from '../../ui/Rating'
import {
  MasterShareWrap,
  Item,
  MasterInfo,
  Image,
  Name,
  Specializations,
  FavoriteMaster,
  City,
  SkeletonMasterItem,
  RatingWrapper,
} from './styles'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../styles/variables'
import { PHOTO_URL } from 'variables'

const MasterItem = ({ master, shareLink, type = 'slider', loading }) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('masters', master)
    setIsFavorit(!!isInStorage)
  }, [])

  const servicesCategories = getServicesCategories(master.services)

  const photoUrl = master?.masterPhoto?.url
    ? `${PHOTO_URL}${master.masterPhoto.url}`
    : null

  const addFavorite = (e, master) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('masters', master)
    setIsFavorit(!isFavorite)
  }
  return loading ? (
    <SkeletonMasterItem variant="rectangular" />
  ) : (
    <Item type={type} id={master.id}>
      <FavoriteMaster
        isFavorite={isFavorite}
        onClick={e => addFavorite(e, master)}
      >
        <HeartFullFill fill={isFavorite} />
      </FavoriteMaster>
      <Image alt="image" src={photoUrl} />
      <MasterShareWrap>
        <Share link={shareLink} title={master?.masterName} />
      </MasterShareWrap>
      <MasterInfo>
        <div>
          <Name>{master?.masterName || ''}</Name>
        </div>
        <div>
          <Specializations>{servicesCategories.join(', ')}</Specializations>
        </div>
        <RatingWrapper>
          {master?.city?.cityName ? <City>{master.city.cityName}</City> : null}
          <Rating
            averageScore={master?.averageScore}
            numberScore={master?.numberScore}
          />
        </RatingWrapper>
      </MasterInfo>
    </Item>
  )
}

export default MasterItem
