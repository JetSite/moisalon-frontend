import { useLazyQuery, useMutation } from '@apollo/client'
import Reviews from '../../../../../blocks/Reviews'
import { FC, useState } from 'react'
import { IReview } from 'src/types/reviews'
import { IID } from 'src/types/common'
import { ADD_REVIEW_BRAND } from 'src/api/graphql/brand/mutations/addReviewBrand'
import { GET_BRAND_REVIEWS } from 'src/api/graphql/brand/queries/getBrandsReviews'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface Props {
  reviews: IReview[]
  brandId: IID
}

const BrandReviews: FC<Props> = ({ reviews, brandId }) => {
  const [updatedReviews, setUpdatedReviews] = useState<IReview[]>(reviews)
  const [loading, setLoading] = useState<boolean>(false)
  const [reviewMutation] = useMutation(ADD_REVIEW_BRAND, {
    onCompleted: () => refetch({ variables: { id: brandId } }),
  })

  const [refetch] = useLazyQuery(GET_BRAND_REVIEWS, {
    onCompleted: data => {
      const prepareData: IReview[] = flattenStrapiResponse(
        data.brand.data,
      ).reviews

      setUpdatedReviews(prepareData)
      setLoading(false)
    },
  })

  return (
    <Reviews
      type="BRAND"
      id={brandId}
      setUpdatedReviews={setUpdatedReviews}
      reviewMutation={reviewMutation}
      reviews={updatedReviews}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

export default BrandReviews
