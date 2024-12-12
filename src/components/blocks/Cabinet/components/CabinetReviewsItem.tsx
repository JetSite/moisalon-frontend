import { FC } from 'react'
import * as Styled from './CabinetListReviews/styles'
import nameRedact from 'src/utils/nameRedact'
import { IReview } from 'src/types/reviews'
import Stars from '../../../ui/Stars'
import { parseToNumber } from 'src/utils/newUtils/common'

interface Props {
  item: IReview
}

export const CabinetReviewsItem: FC<Props> = ({ item }) => {
  return (
    <Styled.Review>
      <Styled.ReviewTop>
        <Styled.ReviewsName>
          {(item?.user?.username && nameRedact(item?.user?.username)) ||
            (item?.user?.email && nameRedact(item?.user?.email)) ||
            (item?.user?.phone && nameRedact(item?.user?.phone)) ||
            ''}
        </Styled.ReviewsName>
        <Stars count={parseToNumber(item.rating?.id) || 0} />
      </Styled.ReviewTop>
      <Styled.ReviewsText>{item.content}</Styled.ReviewsText>
    </Styled.Review>
  )
}
