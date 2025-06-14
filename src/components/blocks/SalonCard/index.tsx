import { useState, useEffect, FC, MouseEvent } from 'react'
import {
  Wrapper,
  ImageWrap,
  Image,
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
import { Skeleton } from '@mui/material'
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
import { getRandomArrayItems } from '@/utils/newUtils/common/getRandomArrayItems'

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

  const optimizedImageFormat = item.photos[0]?.formats?.medium?.url
    ? item.photos[0].formats.medium.url
    : item.photos[0]?.formats?.large?.url
    ? item.photos[0].formats.large.url
    : item.photos[0]?.url
    ? item.photos[0].url
    : null

  const imageUrl = optimizedImageFormat
    ? `${PHOTO_URL}${optimizedImageFormat}`
    : item?.cover?.url
    ? item.cover.url
    : ''

  const [isFavorite, setIsFavorit] = useState<boolean>(false)

  useEffect(() => {
    const isInStorage = inStorage('salons', item)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e: MouseEvent<HTMLButtonElement>, item: ISalon) => {
    e.preventDefault()
    e.stopPropagation()
    handleDeleted && handleDeleted()
    favoritesInStorage('salons', item)
    setIsFavorit(!isFavorite)
  }

  const random3Services: string[] = getRandomArrayItems(item.services, 3).map(
    svc => svc.serviceName ?? svc.service?.title ?? 'Unnamed Service',
  )

  return loading ? (
    <SkeletonSalonItem variant="rectangular" />
  ) : (
    <Wrapper>
      {imageUrl ? (
        <ImageWrap>
          <Image
            src={imageUrl}
            alt="salon cover"
            width={372}
            height={195}
            sizes="(max-width: 768px) 280px, 372px"
            quality={85}
          />
        </ImageWrap>
      ) : (
        <Skeleton variant="rectangular" height="195px" animation={false} />
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
                {random3Services.map(serviceName => (
                  <Activity key={serviceName}>{serviceName}</Activity>
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
