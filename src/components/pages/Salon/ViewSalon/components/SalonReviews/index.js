import { useMutation } from "@apollo/client";
import { createReviewMutation } from "../../../../../../_graphql-legacy/createReviewMutation";
import Reviews from "../../../../../blocks/Reviews";

const SalonReviews = ({ me, data, salonId, refetchReviews }) => {
  const [reviewMutation] = useMutation(createReviewMutation, {
    onCompleted: () => {
      refetchReviews();
    },
  });

  return (
    <Reviews
      type="SALON"
      id={salonId}
      reviewMutation={reviewMutation}
      reviews={data}
      me={me}
    />
  );
};

export default SalonReviews;
