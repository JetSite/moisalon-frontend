import { selectedGroupNamesMax } from '../../../../../utils/serviceCatalog'
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

const MasterItem = ({ master, catalog, deleteItem, setDeleteItem }) => {
  const addFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('masters', item)
    setDeleteItem(!deleteItem)
  }

  return (
    <Item>
      <Favorite onClick={e => addFavorite(e, master)}>
        <HeartFullFill fill={red} />
      </Favorite>
      <Image
        style={{ width: 140, height: 140 }}
        alt="image"
        src={master?.photo?.url || null}
      />
      <Socials>
        {master?.phone ? (
          <PhoneLink
            onClick={e => {
              e.stopPropagation()
            }}
            href={`tel:${master?.phone?.phoneNumber}`}
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
        {master?.addressFull?.city ? (
          <City>{master?.addressFull?.city}</City>
        ) : null}
        <div>
          <Specializations>
            {selectedGroupNamesMax(
              master?.specializations ? master?.specializations[0] : [],
              catalog,
              ', ',
              1,
            )}
          </Specializations>
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
