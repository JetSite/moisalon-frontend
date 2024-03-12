import CabinetReviews from "../../../../../blocks/Cabinet/components/CabinetReviews";

const MasterCabinetReviews = ({ reviews }) => {

  return (
    <div id="reviews">
      <CabinetReviews reviews={reviews?.reviewsForMaster} />
    </div>
  );
};

export default MasterCabinetReviews;
