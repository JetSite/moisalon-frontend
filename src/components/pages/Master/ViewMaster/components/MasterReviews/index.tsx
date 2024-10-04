import { useLazyQuery, useMutation } from '@apollo/client'
import { createReviewMutation } from '../../../../../../_graphql-legacy/createReviewMutation'
import Reviews from '../../../../../blocks/Reviews'
import { FC, useState } from 'react'
import { IReview } from 'src/types/reviews'
import { IID } from 'src/types/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { GET_MASTER_REVIEWS } from 'src/api/graphql/master/queries/getMasterReviews'
import { ADD_REVIEW_MASTER } from 'src/api/graphql/master/mutations/addReviewMaster'

interface Props {
  reviews: IReview[]
  masterId: IID
}

const MasterReviews: FC<Props> = ({ reviews, masterId }) => {
  const [updatedReviews, setUpdatedReviews] = useState<IReview[]>(reviews)
  const [loading, setLoading] = useState<boolean>(false)
  const [reviewMutation] = useMutation(ADD_REVIEW_MASTER, {
    onCompleted: () => refetch({ variables: { id: masterId } }),
  })
  const [refetch] = useLazyQuery(GET_MASTER_REVIEWS, {
    onCompleted: data => {
      const prepareData: IReview[] = flattenStrapiResponse(
        data.master.data,
      ).reviews
      setUpdatedReviews(prepareData)
      setLoading(false)
    },
  })

  return (
    <Reviews
      type="MASTER"
      id={masterId}
      reviewMutation={reviewMutation}
      setUpdatedReviews={setUpdatedReviews}
      reviews={updatedReviews}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

export default MasterReviews
