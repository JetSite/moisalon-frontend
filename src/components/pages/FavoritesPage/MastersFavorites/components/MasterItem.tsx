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
import { LazyType } from 'src/types/common'

interface Props {
  master: IMaster
  catalog: LazyType[] | null
  deleteItem: boolean
  setDeleteItem: Dispatch<SetStateAction<boolean>>
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
        src={PHOTO_URL + master?.masterPhoto.url}
      />
      <Socials>
        {master?.masterPhone ? (
          <PhoneLink
            onClick={e => {
              e.stopPropagation()
            }}
            href={`tel:${master?.masterPhone}`}
          />
        ) : null}
        {master?.masterEmail ? (
          <EmailLink
            onClick={e => {
              e.stopPropagation()
            }}
            href={`mailto:${master?.masterEmail}`}
          />
        ) : null}
      </Socials>
      <MasterInfo>
        <Name>{master?.masterName || ''}</Name>
        {master?.city.cityName ? <City>{master?.city.cityName}</City> : null}
        <div>
          <Specializations>{servicesCategories}</Specializations>
          <Rating
            averageScore={master?.averageScore}
            numberScore={master?.numberScore}
          />
        </div>
      </MasterInfo>
    </Item>
  )
}

export default MasterItem
