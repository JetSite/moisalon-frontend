import { useQuery } from '@apollo/client'
import { reviewsForSalon } from '../../../../../../_graphql-legacy/salon/reviewsForSalon'
import CabinetReviewsItem from '../../../../../blocks/Cabinet/components/CabinetReviewsItem'

const MasterCabinetReviews = ({ salonId, ref2 }) => {
  const { data: reviews } = useQuery(reviewsForSalon, {
    variables: {
      originId: salonId,
    },
  })

  return (
    <div ref={ref2} id="reviews">
      <CabinetReviewsItem reviews={reviews?.reviewsForMaster} />
    </div>
  )
}

export default MasterCabinetReviews
