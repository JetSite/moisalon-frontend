import { useState, useEffect, useContext } from 'react'
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
  Wrap,
  FavoriteIcon,
  SkeletonSalonItem,
  Rent,
  SalonShareWrap,
} from './styles'
import { Skeleton } from '@material-ui/lab'
import { selectedGroupNamesMax } from '../../../utils/serviceCatalog'
import catalogOrDefault from '../../../utils/catalogOrDefault'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import { CatalogsContext } from '../../../searchContext'
import { pluralize } from '../../../utils/pluralize'
import Share from '../../ui/Share'
import Rating from '../../ui/Rating'
import { useMedia } from 'use-media'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../styles/variables'
import { PHOTO_URL } from 'variables'

const SalonCard = ({ item, loading, rent = false, seatCount, shareLink }) => {
  const catalogs = useContext(CatalogsContext)
  const mobileMedia = useMedia({ maxWidth: 768 })
  // const salonActivitiesCatalog = catalogOrDefault(
  //   catalogs?.salonActivitiesCatalog,
  // )

  const logoUrl = item?.salonLogo?.url
    ? `${PHOTO_URL}${item.salonLogo.url}`
    : ''
  const imageUrl = item?.salonCover?.url
    ? `${PHOTO_URL}${item.salonCover.url}`
    : ''

  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('salons', item)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('salons', item)
    setIsFavorit(!isFavorite)
  }

  return loading ? (
    <SkeletonSalonItem variant="rectangular" />
  ) : (
    <Wrapper>
      {imageUrl ? (
        <ImageWrap background={`url(${imageUrl})`} />
      ) : (
        <Skeleton variant="rect" height="195px" animation={false} />
      )}
      {rent && seatCount !== undefined ? (
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
            <Name>{item?.salonName || ''}</Name>
            <Socials>
              {item?.attributes?.salonPhones &&
              item?.attributes?.salonPhones.length ? (
                <PhoneLink
                  onClick={e => e.stopPropagation()}
                  href={`tel:${item.attributes.salonPhones[0].phoneNumber}`}
                />
              ) : null}
              {item?.salonEmail ? (
                <EmailLink
                  onClick={e => e.stopPropagation()}
                  href={`mailto:${item.salonEmail}`}
                />
              ) : null}
            </Socials>
          </Top>
          <Info>
            {/* <SalonInfo>
              <Activities>
                {selectedGroupNamesMax(
                  item.activities,
                  salonActivitiesCatalog,
                  ', ',
                  1,
                )}
              </Activities>
            </SalonInfo> */}
            {item?.salonAddress ? <Address>{item.salonAddress}</Address> : null}
          </Info>
        </Wrap>
        <Rating
          averageScore={item?.salonAverageScore}
          numberScore={item?.salonSumScore}
          position={!mobileMedia ? 'justify' : 'start'}
          fontSize={!mobileMedia ? '14px' : '10px'}
          fontWeight={600}
        />
      </Content>
      <FavoriteIcon isFavorite={isFavorite} onClick={e => addFavorite(e, item)}>
        <HeartFullFill fill={isFavorite} />
      </FavoriteIcon>
      <SalonShareWrap>
        <Share link={shareLink} title={item?.salonName} />
      </SalonShareWrap>
    </Wrapper>
  )
}

export default SalonCard
