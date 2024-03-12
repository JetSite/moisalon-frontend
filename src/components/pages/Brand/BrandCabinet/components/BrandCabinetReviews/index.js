import { useQuery } from "@apollo/client";
import { reviewsForBrand } from "../../../../../../_graphql-legacy/brand/reviewsForBrand";
import CabinetReviews from "../../../../../blocks/Cabinet/components/CabinetReviews";

const BrandCabinetReviews = ({ brandId, ref2 }) => {
  const { data: reviews } = useQuery(reviewsForBrand, {
    variables: {
      originId: brandId,
    },
  });

  return (
    <div ref={ref2} id="reviews">
      <CabinetReviews reviews={reviews?.reviewsForBrand} />
    </div>
  );
};

export default BrandCabinetReviews;
