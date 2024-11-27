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
  Address,
  Category,
  SkeletonSalonItem,
  AdShareWrap,
} from './styles'
import { Skeleton } from '@material-ui/lab'
import Share from '../../ui/Share'
import { PHOTO_URL } from '../../../api/variables'
import { FC } from 'react'
import {
  IPromoBrand,
  IPromoMaster,
  IPromoSalon,
  IPromotions,
} from 'src/types/promotions'

interface Props {
  item: IPromotions
  loading?: boolean
  shareLink?: string
}

const AdCard: FC<Props> = ({ item, loading, shareLink }) => {
  // const content = () => {
  //   if (item?.origin === 'MASTER') {
  //     return {
  //       category: `Мастер ${item?.masterOrigin?.name}`,
  //       email: item?.masterOrigin?.email,
  //       phone: item?.masterOrigin?.phone?.phoneNumber,
  //     }
  //   } else if (item?.origin === 'SALON') {
  //     return {
  //       category: `Салон ${item?.salonOrigin?.name}`,
  //       email: item?.salonOrigin?.contactPersonEmail,
  //       phone: item?.salonOrigin?.contactPersonPhone?.phoneNumber,
  //     }
  //   } else if (item?.origin === 'BRAND') {
  //     return {
  //       category: `Бренд ${item?.brandOrigin?.name}`,
  //       email: item?.brandOrigin?.email,
  //       phone: item?.brandOrigin?.phone?.phoneNumber,
  //     }
  //   } else {
  //     return {
  //       category: 'Акция',
  //       email: '',
  //       phone: '',
  //     }
  //   }
  // }

  const owner = item.brand || item.salon || item.master

  let phone: string | null = null

  if (!owner) return null

  if ('phone' in owner) {
    phone = owner.phone
  } else if ('salonPhones' in owner) {
    phone = owner.salonPhones?.[0]?.phoneNumber || null
  } else if ('phones' in owner) {
    phone = owner.phones?.[0]?.phoneNumber || null
  }

  const imageUrl = item.cover ? `${PHOTO_URL}${item.cover.url}` : null

  return loading ? (
    <SkeletonSalonItem />
  ) : (
    <Wrapper>
      {imageUrl ? (
        <ImageWrap background={`url(${imageUrl})`} />
      ) : (
        <Skeleton variant="rect" height="195px" animation={false} />
      )}
      <Content>
        <Top>
          <Name>{item.title}</Name>
          <Socials>
            {phone ? (
              <PhoneLink
                onClick={e => e.stopPropagation()}
                href={`tel:${phone}`}
              />
            ) : null}
            {owner?.email ? (
              <EmailLink
                onClick={e => e.stopPropagation()}
                href={`mailto:${owner.email}`}
              />
            ) : null}
          </Socials>
        </Top>
        <Bottom>
          <BottomLeft>
            {/* <Category>{content().category}</Category> */}
            {/* <AdOffer>1750</AdOffer> */}
          </BottomLeft>
          <BottomRight>
            {owner?.address ? <Address>{owner.address}</Address> : null}
          </BottomRight>
        </Bottom>
      </Content>

      {shareLink ? (
        <AdShareWrap>
          <Share link={shareLink} title={item.title} />
        </AdShareWrap>
      ) : null}
    </Wrapper>
  )
}

export default AdCard
