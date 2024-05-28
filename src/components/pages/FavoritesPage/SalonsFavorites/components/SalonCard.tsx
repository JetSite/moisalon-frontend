import {
  Dispatch,
  FC,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  Wrapper,
  ImageWrap,
  Content,
  Top,
  Name,
  Socials,
  PhoneLink,
  EmailLink,
  Info,
  Address,
  Activities,
  SalonInfo,
  Rating,
  Count,
  Wrap,
  FavoriteIcon,
  Rent,
} from './styled'
import { Skeleton } from '@material-ui/lab'
import {
  getServicesCategories,
  selectedGroupNames,
} from '../../../../../utils/serviceCatalog'
import Stars from '../../../../ui/Stars'
import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import { pluralize } from '../../../../../utils/pluralize'
import { red } from '../../../../../styles/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { ISalon } from 'src/types/salon'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { PHOTO_URL } from 'src/api/variables'
import { ISetState } from 'src/types/common'

interface Props {
  salon: ISalon
  deleteItem: boolean
  setDeleteItem: ISetState<boolean>
  handleDeleted: () => void
}

const SalonCard: FC<Props> = ({
  salon,
  deleteItem,
  setDeleteItem,
  handleDeleted,
}) => {
  const { salonCover } = salon
  const imageUrl = salonCover?.url
  const [seatCount, setSeatCount] = useState(0)

  const addFavorite = (e: MouseEvent<HTMLDivElement>, salon: ISalon) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteItem(!deleteItem)
    handleDeleted && handleDeleted()
  }

  useEffect(() => {
    let count = 0
    // if (salon?.lessor) {
    //   salon?.rooms.map(item => item?.seats.forEach(el => count++))
    // }
    setSeatCount(count)
  }, [])

  const servicesCategories = getServicesCategories(salon.services)

  return (
    <Wrapper>
      {imageUrl ? (
        <ImageWrap background={`url(${PHOTO_URL + imageUrl})`} />
      ) : (
        <Skeleton variant="rect" height="190px" animation={false} />
      )}
      {salon?.salonWorkplacesCount ? (
        <Rent>{`Доступно ${salon.salonWorkplacesCount} ${pluralize(
          salon.salonWorkplacesCount,
          'место',
          'места',
          'мест',
        )}`}</Rent>
      ) : null}
      <Content>
        <Wrap>
          <Top>
            <Name>{salon?.salonName || ''}</Name>
            <Socials>
              {salon?.salonPhones && salon?.salonPhones.length ? (
                <PhoneLink
                  onClick={e => {
                    e.stopPropagation()
                  }}
                  href={`tel:${salon?.salonPhones[0].phoneNumber}`}
                />
              ) : null}
              {salon?.salonEmail ? (
                <EmailLink
                  onClick={e => {
                    e.stopPropagation()
                  }}
                  href={`mailto:${salon?.salonEmail}`}
                />
              ) : null}
            </Socials>
            <FavoriteIcon onClick={e => addFavorite(e, salon)}>
              <HeartFullFill fill={red} />
            </FavoriteIcon>
          </Top>
          <Info>
            <SalonInfo>
              <Activities>{servicesCategories}</Activities>
            </SalonInfo>
            {salon?.salonAddress ? (
              <Address>{salon?.salonAddress}</Address>
            ) : null}
          </Info>
        </Wrap>
        <Rating>
          <Stars count={Math.round(salon?.rating)} />
          <Count>{salon?.rating || 0}</Count>
        </Rating>
      </Content>
    </Wrapper>
  )
}

export default SalonCard
