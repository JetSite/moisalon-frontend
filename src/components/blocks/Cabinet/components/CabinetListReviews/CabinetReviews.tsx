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

interface Props {
  loading: boolean
  reviews: IReview[]
}

export const CabinetReviews: FC<Props> = ({ reviews, loading }) => {
  const [offset, setOffset] = useState(4)

  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <ReviewsWrapper>
      {reviews?.length > 0 ? (
        <>
          {reviews?.slice(0, offset).map(item => (
            <Review key={item.id}>
              <ReviewTop>
                <ReviewsName>{nameRedact(item.reviewTitle)}</ReviewsName>
                <Stars count={5} />
              </ReviewTop>
              <ReviewsText>{item.reviewContent}</ReviewsText>
            </Review>
          ))}
          {reviews?.length > offset ? (
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
