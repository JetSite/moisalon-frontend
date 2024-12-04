import { useState, useEffect } from 'react'
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
} from './styles'
import { Skeleton } from '@material-ui/lab'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../utils/favoritesInStorage'
import Rating from '../../../../ui/Rating'
import { useMedia } from 'use-media'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'

const SalonCardMap = ({ item, loading }) => {
  const { catalogs } = useBaseStore(getStoreData)
  const mobileMedia = useMedia({ maxWidth: 768 })
  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog,
  )
  const { defaultPhoto, logo } = item
  const imageUrl =
    defaultPhoto !== null ? defaultPhoto.url : logo ? logo?.url : ''

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
      <Content>
        <Wrap>
          <Top>
            <Name>{item.name || ''}</Name>
            <Socials>
              {item?.phones && item?.phones.length ? (
                <PhoneLink
                  onClick={e => e.stopPropagation()}
                  href={`tel:${item?.phones[0].phoneNumber}`}
                />
              ) : null}
              {item?.email ? (
                <EmailLink
                  onClick={e => e.stopPropagation()}
                  href={`mailto:${item?.email}`}
                />
              ) : null}
            </Socials>
          </Top>
          <Info>
            <SalonInfo>
              <Activities></Activities>
            </SalonInfo>
            {item?.address?.full ? (
              <Address>{item?.address?.full}</Address>
            ) : null}
          </Info>
        </Wrap>
        <Rating
          rating={item?.averageScore}
          numberScore={item?.numberScore}
          position={!mobileMedia ? 'justify' : 'start'}
          fontSize={!mobileMedia ? '14px' : '10px'}
          fontWeight={600}
        />
      </Content>
      <FavoriteIcon
        isFavorite={isFavorite}
        onClick={e => addFavorite(e, item)}
      />
    </Wrapper>
  )
}

export default SalonCardMap
