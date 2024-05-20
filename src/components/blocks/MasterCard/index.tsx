import { useState, useEffect, FC, MouseEvent } from 'react'
import {
  getServiceCategoriesNames,
  selectedGroupNamesMax,
} from '../../../utils/serviceCatalog'
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
import { red } from '../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'
import { IMaster } from 'src/types/masters'
import { Activity } from '../SalonCard/styles'

interface Props {
  master: IMaster
  shareLink: string
  loading?: boolean
  type?: string
}

const MasterItem: FC<Props> = ({
  master,
  shareLink,
  type = 'slider',
  loading,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('masters', master)
    setIsFavorit(!!isInStorage)
  }, [])

  const photoUrl = `${PHOTO_URL}${master.masterPhoto.url}`

  const addFavorite = (e: MouseEvent, master: IMaster | null) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('masters', master)
    setIsFavorit(!isFavorite)
  }
  return loading ? (
    <SkeletonMasterItem />
  ) : (
    <Item type={type}>
      <FavoriteMaster onClick={e => addFavorite(e, master)}>
        <HeartFullFill fill={isFavorite} />
      </FavoriteMaster>
      <Image alt="image" src={photoUrl} />
      <MasterShareWrap>
        <Share link={shareLink} title={master.masterName || ''} />
      </MasterShareWrap>
      <MasterInfo>
        <div>
          <Name>{master.masterName || ''}</Name>
        </div>
        <div>
          <Specializations>
            {master.services.slice(0, 3).map(servis => (
              <Activity key={servis.id}>{servis.serviceName}</Activity>
            ))}
          </Specializations>
        </div>
        <RatingWrapper>
          {master.city?.cityName ? <City>{master.city.cityName}</City> : null}
          <Rating
            rating={master.rating}
            countRatings={master.ratingCount}
            countReviews={master.reviewsCount}
          />
        </RatingWrapper>
      </MasterInfo>
    </Item>
  )
}

export default MasterItem
