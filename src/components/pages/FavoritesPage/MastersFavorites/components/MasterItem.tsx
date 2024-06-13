import {
  getServicesCategories,
  selectedGroupNamesMax,
} from '../../../../../utils/serviceCatalog'
import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import Rating from '../../../../ui/Rating'
import {
  Image,
  Favorite,
  Name,
  Item,
  MasterInfo,
  Specializations,
  Socials,
  PhoneLink,
  EmailLink,
  City,
} from '../styled'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../../styles/variables'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { IMaster } from 'src/types/masters'
import { PHOTO_URL } from 'src/api/variables'
import { ISetState, LazyType } from 'src/types/common'

interface Props {
  master: IMaster
  catalog: LazyType[] | null
  deleteItem: boolean
  setDeleteItem: ISetState<boolean>
}

const MasterItem: FC<Props> = ({
  master,
  catalog,
  deleteItem,
  setDeleteItem,
}) => {
  const addFavorite = (e: MouseEvent<HTMLDivElement>, item: IMaster) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteItem(!deleteItem)
  }

  const servicesCategories = getServicesCategories(master.services)

  return (
    <Item>
      <Favorite onClick={e => addFavorite(e, master)}>
        <HeartFullFill fill={red} />
      </Favorite>
      <Image
        style={{ width: 140, height: 140 }}
        alt="image"
        src={PHOTO_URL + master?.photo.url}
      />
      <Socials>
        {master?.phone ? (
          <PhoneLink
            onClick={e => {
              e.stopPropagation()
            }}
            href={`tel:${master?.phone}`}
          />
        ) : null}
        {master?.email ? (
          <EmailLink
            onClick={e => {
              e.stopPropagation()
            }}
            href={`mailto:${master?.email}`}
          />
        ) : null}
      </Socials>
      <MasterInfo>
        <Name>{master?.name || ''}</Name>
        {master?.city.name ? <City>{master?.city.name}</City> : null}
        <div>
          <Specializations>{servicesCategories}</Specializations>
          <Rating
            rating={master?.rating}
            countRatings={master.ratingCount}
            countReviews={master.reviewsCount}
          />
        </div>
      </MasterInfo>
    </Item>
  )
}

export default MasterItem
