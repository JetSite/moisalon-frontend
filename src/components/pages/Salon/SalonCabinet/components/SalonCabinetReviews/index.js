import { useQuery } from "@apollo/client";
import { reviewsForSalon } from "../../../../../../_graphql-legacy/salon/reviewsForSalon";
import CabinetReviews from "../../../../../blocks/Cabinet/components/CabinetReviews";

const MasterCabinetReviews = ({ salonId, ref2 }) => {
  const { data: reviews } = useQuery(reviewsForSalon, {
    variables: {
      originId: salonId,
    },
  });

  return (
    <div ref={ref2} id="reviews">
      <CabinetReviews reviews={reviews?.reviewsForMaster} />
    </div>
  );
};

export default MasterCabinetReviews;
