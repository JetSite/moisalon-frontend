import { useState, useEffect, FC, MouseEvent } from 'react'
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
  Wrap,
  FavoriteIcon,
  SkeletonSalonItem,
  Rent,
  SalonShareWrap,
  SalonInfo,
  Activities,
  Activity,
} from './styles'
import { Skeleton } from '@material-ui/lab'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import { pluralize } from '../../../utils/pluralize'
import Share from '../../ui/Share'
import Rating from '../../ui/Rating'
import { useMedia } from 'use-media'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { PHOTO_URL } from 'src/api/variables'
import { ISalon } from 'src/types/salon'

interface Props {
  item: ISalon
  loading?: boolean
  rent?: boolean
  seatCount?: number
  shareLink?: string
  handleDeleted?: () => void
}

const SalonCard: FC<Props> = ({
  item,
  loading,
  rent = false,
  seatCount,
  shareLink,
  handleDeleted,
}) => {
  const mobileMedia = useMedia({ maxWidth: 768 })

  const logoUrl = item?.logo?.url ? `${PHOTO_URL}${item.logo.url}` : ''
  const imageUrl = item?.cover?.url
    ? `${PHOTO_URL}${item.cover.url}`
    : item.photos?.length
    ? `${PHOTO_URL}${item.photos[0]?.url}`
    : ''

  const [isFavorite, setIsFavorit] = useState<boolean>(false)

  useEffect(() => {
    const isInStorage = inStorage('salons', item)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e: MouseEvent<HTMLButtonElement>, item: any) => {
    e.preventDefault()
    e.stopPropagation()
    handleDeleted && handleDeleted()
    favoritesInStorage('salons', item)
    setIsFavorit(!isFavorite)
  }

  return loading ? (
    <SkeletonSalonItem variant="rect" />
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
            <Name>{item?.name || ''}</Name>
            <Socials>
              {item?.salonPhones && item?.salonPhones?.length ? (
                <PhoneLink
                  onClick={e => e.stopPropagation()}
                  href={`tel:${item.salonPhones[0].phoneNumber}`}
                />
              ) : null}
              {item?.email ? (
                <EmailLink
                  onClick={e => e.stopPropagation()}
                  href={`mailto:${item.email}`}
                />
              ) : null}
            </Socials>
          </Top>
          <Info>
            <SalonInfo>
              <Activities>
                {item.services?.slice(0, 3).map((servis, idx) => (
                  <Activity key={servis.service?.id || idx.toString()}>
                    {servis.service?.title || servis.serviceName}
                  </Activity>
                ))}
              </Activities>
            </SalonInfo>
            {item?.address ? <Address>{item.address}</Address> : null}
          </Info>
        </Wrap>
        <Rating
          rating={item?.rating}
          countRatings={item.ratingCount}
          position={!mobileMedia ? 'justify' : 'start'}
          fontSize={!mobileMedia ? '14px' : '10px'}
          fontWeight={600}
          countReviews={item?.reviewsCount}
        />
      </Content>
      <FavoriteIcon isFavorite={isFavorite} onClick={e => addFavorite(e, item)}>
        <HeartFullFill fill={isFavorite} />
      </FavoriteIcon>
      {!!shareLink && (
        <SalonShareWrap>
          <Share link={shareLink} title={item?.name} />
        </SalonShareWrap>
      )}
    </Wrapper>
  )
}

export default SalonCard
