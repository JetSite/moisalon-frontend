import { useLazyQuery, useMutation } from '@apollo/client'
import Reviews from '../../../../blocks/Reviews'
import { FC, useState } from 'react'
import { IID, ISetState } from 'src/types/common'
import { ADD_REVIEW_EDUCATION } from 'src/api/graphql/education/mutations/addReviewEducation'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { GET_EDUCATION_REVIEWS } from 'src/api/graphql/education/queries/getEducationsReviews'
import { IReview } from 'src/types/reviews'

interface EducationReviewsProps {
  reviews: IReview[]
  educationID: IID
}

const EducationReviews: FC<EducationReviewsProps> = ({
  educationID,
  reviews,
}) => {
  const [updatedReviews, setUpdatedReviews] = useState<IReview[]>(reviews)
  const [loading, setLoading] = useState<boolean>(false)
  const [reviewMutation] = useMutation(ADD_REVIEW_EDUCATION, {
    onCompleted: () => refetch({ variables: { id: educationID } }),
    onError: error => {
      console.error('Failed to add review:', error)
      setLoading(false)
    },
  })
  const [refetch] = useLazyQuery(GET_EDUCATION_REVIEWS, {
    onCompleted: data => {
      const prepareData: IReview[] = flattenStrapiResponse(
        data.master.data,
      ).reviews
      setUpdatedReviews(prepareData)
      setLoading(false)
    },
    onError: error => {
      console.error('Failed to add review:', error)
      setLoading(false)
    },
  })

  return (
    <Reviews
      type="EDUCATION"
      id={educationID}
      reviewMutation={reviewMutation}
      setUpdatedReviews={setUpdatedReviews}
      reviews={updatedReviews}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

export default EducationReviews
