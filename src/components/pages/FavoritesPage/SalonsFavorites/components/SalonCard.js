import { useEffect, useState } from 'react'
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
import { selectedGroupNames } from '../../../../../utils/serviceCatalog'
import Stars from '../../../../ui/Stars'
import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import { pluralize } from '../../../../../utils/pluralize'
import { red } from '../../../../../styles/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'

const SalonCard = ({
  salon,
  catalog,
  deleteItem,
  setDeleteItem,
  handleDeleted,
}) => {
  const { defaultPhoto } = salon
  const { logo } = salon
  const imageUrl = defaultPhoto ? defaultPhoto?.url : logo?.url
  const [seatCount, setSeatCount] = useState(0)

  const addFavorite = (e, salon) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('salons', salon)
    setDeleteItem(!deleteItem)
    handleDeleted && handleDeleted()
  }

  useEffect(() => {
    let count = 0
    if (salon?.lessor) {
      salon?.rooms.map(item => item?.seats.forEach(el => count++))
    }
    setSeatCount(count)
  }, [])

  return (
    <Wrapper>
      {imageUrl ? (
        <ImageWrap background={`url(${imageUrl})`} />
      ) : (
        <Skeleton variant="rect" height="190px" animation={false} />
      )}
      {salon?.lessor ? (
        <Rent>{`Доступно ${seatCount} ${pluralize(
          seatCount,
          'место',
          'места',
          'мест',
        )}`}</Rent>
      ) : null}
      <Content>
        <Wrap>
          <Top>
            <Name>{salon?.name || ''}</Name>
            <Socials>
              {salon?.phones && salon?.phones.length ? (
                <PhoneLink
                  onClick={e => {
                    e.stopPropagation()
                  }}
                  href={`tel:${salon?.phones[0].phoneNumber}`}
                />
              ) : null}
              {salon?.email ? (
                <EmailLink
                  onClick={e => {
                    e.stopPropagation()
                  }}
                  href={`mailto:${salon?.email}`}
                />
              ) : null}
            </Socials>
            <FavoriteIcon onClick={e => addFavorite(e, salon)}>
              <HeartFullFill fill={red} />
            </FavoriteIcon>
          </Top>
          <Info>
            <SalonInfo>
              <Activities>
                {selectedGroupNames(salon?.activities, catalog, ', ')}
              </Activities>
            </SalonInfo>
            {salon?.address?.full ? (
              <Address>{salon?.address?.full}</Address>
            ) : null}
          </Info>
        </Wrap>
        <Rating>
          <Stars count={Math.round(salon?.averageScore)} />
          <Count>{salon?.numberScore || 0}</Count>
        </Rating>
      </Content>
    </Wrapper>
  )
}

export default SalonCard
