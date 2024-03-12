import { useMutation } from "@apollo/client";
import { createReviewMutation } from "../../../../../../_graphql-legacy/createReviewMutation";
import Reviews from "../../../../../blocks/Reviews";

const BrandReviews = ({ me, data, brandId, refetchReviews }) => {
  const [reviewMutation] = useMutation(createReviewMutation, {
    onCompleted: () => {
      refetchReviews();
    },
  });

  return (
    <Reviews
      type="BRAND"
      id={brandId}
      reviewMutation={reviewMutation}
      reviews={data}
      me={me}
    />
  );
};

export default BrandReviews;
