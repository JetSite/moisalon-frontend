import { useLazyQuery, useMutation } from '@apollo/client'
import Reviews from '../../../../../blocks/Reviews'
import { FC, useState } from 'react'
import { IReview } from 'src/types/reviews'
import { IID } from 'src/types/common'
import { GET_SALON_REVIEWS } from 'src/api/graphql/salon/queries/getSalonReviews'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ADD_REVIEW_SALON } from 'src/api/graphql/salon/mutations/addReviewSalon'

interface Props {
  reviews: IReview[]
  salonId: IID
}

const SalonReviews: FC<Props> = ({ reviews, salonId }) => {
  const [updatedReviews, setUpdatedReviews] = useState<IReview[]>(reviews)
  const [loading, setLoading] = useState<boolean>(false)
  const [reviewMutation] = useMutation(ADD_REVIEW_SALON, {
    onCompleted: () => refetch({ variables: { id: salonId } }),
  })

  const [refetch] = useLazyQuery(GET_SALON_REVIEWS, {
    onCompleted: data => {
      const prepareData: IReview[] = flattenStrapiResponse(
        data.salon.data,
      ).reviews
      setUpdatedReviews(prepareData)
      setLoading(false)
    },
  })

  return (
    <Reviews
      type="SALON"
      id={salonId}
      reviewMutation={reviewMutation}
      reviews={updatedReviews}
      loading={loading}
      setUpdatedReviews={setUpdatedReviews}
      setLoading={setLoading}
    />
  )
}

export default SalonReviews
