import { useState, useEffect, FC, MouseEvent } from 'react'
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
  master: IMaster | null
  shareLink: string
  loading?: boolean
  type?: string
  handleDeleted?: () => void
}

const MasterItem: FC<Props> = ({
  master,
  shareLink,
  type = 'slider',
  loading,
  handleDeleted,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('masters', master)
    setIsFavorit(!!isInStorage)
  }, [])

  const photoUrl = master
    ? `${PHOTO_URL}${master.photo?.url || master.photo?.url}`
    : ''

  const addFavorite = (e: MouseEvent, master: IMaster | null) => {
    e.preventDefault()
    e.stopPropagation()
    handleDeleted && handleDeleted()
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
        <Share link={shareLink} title={master?.name || master?.name || ''} />
      </MasterShareWrap>
      <MasterInfo>
        <div>
          <Name>{master?.name || master?.name || ''}</Name>
        </div>
        <div>
          <Specializations>
            {master &&
              master.services
                ?.slice(0, 3)
                .map(service => (
                  <Activity key={service.id}>{service.service.title}</Activity>
                ))}
          </Specializations>
        </div>
        <RatingWrapper>
          {master?.city?.name ? <City>{master.city.name}</City> : null}
          <Rating
            rating={master?.rating}
            countRatings={master?.ratingCount}
            countReviews={master?.reviewsCount}
          />
        </RatingWrapper>
      </MasterInfo>
    </Item>
  )
}

export default MasterItem
