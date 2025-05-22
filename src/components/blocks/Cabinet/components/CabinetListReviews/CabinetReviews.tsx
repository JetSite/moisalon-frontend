import { FC, useState } from 'react'
import { ReviewsWrapper, ReviewsButton, SkeletonWrap, Subtitle } from './styles'
import ProfileItem from '../CabinetSales/components/ProfileItem'
import { ISetState } from 'src/types/common'
import { IProfileType } from '../CabinetSales'
import { IProfileWithReviews } from '.'
import { CabinetReviewsItem } from '../CabinetReviewsItem'

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
    return <SkeletonWrap variant="rectangular" />
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
              return <CabinetReviewsItem key={item.id} item={item} />
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
