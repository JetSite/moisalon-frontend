import { useQuery } from '@apollo/client'
import CabinetReviews from '../../../../../blocks/Cabinet/components/CabinetReviewsItem'

const BrandCabinetReviews = ({ brandId, ref2 }) => {
  // const { data: reviews } = useQuery(reviewsForBrand, {
  //   variables: {
  //     originId: brandId,
  //   },
  // })

  return (
    <div ref={ref2} id="reviews">
      <CabinetReviews reviews={[]} />
    </div>
  )
}

export default BrandCabinetReviews
