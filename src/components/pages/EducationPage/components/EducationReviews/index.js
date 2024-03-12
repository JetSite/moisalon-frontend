import { useMutation } from "@apollo/client";
import Reviews from "../../../../blocks/Reviews";
import { createCommentMutation } from "../../../../../_graphql-legacy/createCommentMutation";

const EducationReviews = ({ me, refetchReviews, data, id }) => {
  const [reviewMutation] = useMutation(createCommentMutation, {
    onCompleted: () => {
      refetchReviews({ id: id });
    },
  });

  return (
    <Reviews
      type="EDUCATION"
      id={id}
      reviewMutation={reviewMutation}
      reviews={data}
      me={me}
    />
  );
};

export default EducationReviews;
