import { useMutation } from '@apollo/client'
import Reviews from '../../../../blocks/Reviews'
import { createCommentMutation } from '../../../../../_graphql-legacy/createCommentMutation'
import { FC } from 'react'
import { ISetState } from 'src/types/common'
import { ADD_REVIEW_EDUCATION } from 'src/api/graphql/education/mutations/addReviewEducation'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface EducationReviewsProps {
  refetchReviews: any
  data: any
  id: any
  loadingReview: boolean
  setLoadingReview: ISetState<boolean>
  setReviews: any
}

const EducationReviews: FC<EducationReviewsProps> = ({
  refetchReviews,
  data,
  id,
  loadingReview,
  setLoadingReview,
  setReviews,
}) => {
  const [reviewMutation] = useMutation(ADD_REVIEW_EDUCATION, {
    onCompleted: async () => {
      const res = await refetchReviews({
        filters: { educations: { id: { eq: id } } },
      })
      if (res?.data?.education?.data?.id) {
        const newReviews = flattenStrapiResponse(
          res.data.education.data.attributes.reviews,
        )
        setReviews(newReviews)
        setLoadingReview(false)
      }
    },
  })
  return (
    <Reviews
      type="EDUCATION"
      id={id}
      reviewMutation={reviewMutation}
      reviews={data}
      loading={loadingReview}
      setLoading={setLoadingReview}
    />
  )
}

export default EducationReviews
