import { useMutation } from "@apollo/client";
import { createReviewMutation } from "../../../../../../_graphql-legacy/createReviewMutation";
import Reviews from "../../../../../blocks/Reviews";

const MasterReviews = ({ me, refetchReviews, data, masterId }) => {
  const [reviewMutation] = useMutation(createReviewMutation, {
    onCompleted: () => {
      refetchReviews();
    },
  });

  return (
    <Reviews
      type="MASTER"
      id={masterId}
      reviewMutation={reviewMutation}
      reviews={data}
      me={me}
    />
  );
};

export default MasterReviews;
