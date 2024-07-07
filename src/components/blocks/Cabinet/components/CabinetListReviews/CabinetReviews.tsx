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
          {reviews?.slice(0, offset).map(item => {
            if (item.title || item.content) {
              return (
                <Review key={item.id}>
                  <ReviewTop>
                    <ReviewsName>
                      {nameRedact(item.title || item.content)}
                    </ReviewsName>
                    <Stars count={0} />
                  </ReviewTop>
                  <ReviewsText>{item.content}</ReviewsText>
                </Review>
              )
            } else {
              return null
            }
          })}
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
