import { FC, useState } from 'react'
import {
  ReviewsWrapper,
  Review,
  ReviewTop,
  ReviewsName,
  ReviewsText,
  ReviewsButton,
  Back,
  SkeletonWrap,
  Subtitle,
} from './styles'
import Stars from '../../../../ui/Stars'
import nameRedact from '../../../../../utils/nameRedact'
import { IReview } from 'src/types/reviews'
import { parseToNumber } from 'src/utils/newUtils/common'
import ProfileItem from '../CabinetSales/components/ProfileItem'
import { ISetState } from 'src/types/common'
import { IProfileType } from '../CabinetSales'
import { IProfileWithReviews } from '.'

interface Props {
  loading: boolean
  setActiveProfile: ISetState<IProfileWithReviews | null>
  activeProfile: IProfileWithReviews
  type: IProfileType
}

export const CabinetReviews: FC<Props> = ({
  activeProfile,
  loading,
  type,
  setActiveProfile,
}) => {
  const [offset, setOffset] = useState(4)

  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  const typeString =
    type === 'master' ? 'мастера' : type === 'salon' ? 'салона' : 'бренда'

  return (
    <ReviewsWrapper>
      <ProfileItem
        onClick={() => {
          setActiveProfile(null)
        }}
        profile={activeProfile}
        type={typeString}
        active={!!activeProfile}
      />
      {activeProfile.reviews?.length > 0 ? (
        <>
          {activeProfile.reviews?.slice(0, offset).map(item => {
            if (item.title || item.content) {
              return (
                <Review key={item.id}>
                  <ReviewTop>
                    <ReviewsName>
                      {(item?.user?.username &&
                        nameRedact(item?.user?.username)) ||
                        (item?.user?.email && nameRedact(item?.user?.email)) ||
                        (item?.user?.phone && nameRedact(item?.user?.phone)) ||
                        ''}
                    </ReviewsName>
                    <Stars count={parseToNumber(item.rating?.id) || 0} />
                  </ReviewTop>
                  <ReviewsText>{item.content}</ReviewsText>
                </Review>
              )
            } else {
              return null
            }
          })}
          {activeProfile.reviews?.length > offset ? (
            <ReviewsButton onClick={() => setOffset(offset + 4)}>
              Смотреть раннее
            </ReviewsButton>
          ) : null}
        </>
      ) : (
        <Subtitle>У профиля нет отзывов</Subtitle>
      )}
    </ReviewsWrapper>
  )
}
