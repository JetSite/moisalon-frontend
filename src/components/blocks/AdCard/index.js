import {
  Wrapper,
  ImageWrap,
  Content,
  Top,
  Name,
  Socials,
  PhoneLink,
  EmailLink,
  Bottom,
  BottomLeft,
  BottomRight,
  AdOffer,
  Address,
  Category,
  FavoriteIcon,
  SkeletonSalonItem,
  AdShareWrap,
} from './styles'
import { Skeleton } from '@material-ui/lab'
import Share from '../../ui/Share'
import { useMedia } from 'use-media'
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../styles/variables'
import { PHOTO_URL } from '../../../api/variables'

const AdCard = ({ item, loading, shareLink }) => {
  const mobileMedia = useMedia({ maxWidth: 768 })

  const content = () => {
    if (item?.origin === 'MASTER') {
      return {
        category: `Мастер ${item?.masterOrigin?.name}`,
        email: item?.masterOrigin?.email,
        phone: item?.masterOrigin?.phone?.phoneNumber,
      }
    } else if (item?.origin === 'SALON') {
      return {
        category: `Салон ${item?.salonOrigin?.name}`,
        email: item?.salonOrigin?.contactPersonEmail,
        phone: item?.salonOrigin?.contactPersonPhone?.phoneNumber,
      }
    } else if (item?.origin === 'BRAND') {
      return {
        category: `Бренд ${item?.brandOrigin?.name}`,
        email: item?.brandOrigin?.email,
        phone: item?.brandOrigin?.phone?.phoneNumber,
      }
    } else {
      return {
        category: 'Акция',
        email: '',
        phone: '',
      }
    }
  }

  const imageUrl = `${PHOTO_URL}${item?.photoId}/original`

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
        <Top>
          <Name>{item?.title}</Name>
          <Socials>
            {content().phone ? (
              <PhoneLink
                onClick={e => e.stopPropagation()}
                href={`tel:${content().phone}`}
              />
            ) : null}
            {content().email ? (
              <EmailLink
                onClick={e => e.stopPropagation()}
                href={`mailto:${content().email}`}
              />
            ) : null}
          </Socials>
        </Top>
        <Bottom>
          <BottomLeft>
            <Category>{content().category}</Category>
            {/* <AdOffer>1750</AdOffer> */}
          </BottomLeft>
          <BottomRight>
            {/* {item?.address?.full ? <Address>адрес</Address> : null} */}
            <Address>г Москва, Большой Афанасьевский пер, д 12 стр 2</Address>
          </BottomRight>
        </Bottom>
      </Content>
      {/* <FavoriteIcon
        isFavorite={isFavorite}
        onClick={(e) => addFavorite(e, item)}
      >
        <HeartFullFill fill={isFavorite ? red : "#e3e3e3"} />
      </FavoriteIcon> */}
      <AdShareWrap>
        <Share link={shareLink} title={item?.name} />
      </AdShareWrap>
    </Wrapper>
  )
}

export default AdCard
