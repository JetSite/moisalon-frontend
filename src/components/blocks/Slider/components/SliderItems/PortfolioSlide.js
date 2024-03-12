import PortfolioItem from "../../../../pages/Master/ViewMaster/components/PortfolioItem/PortfolioItem";

const PortfolioSlide = ({ item, isEditing, deleteFunction }) => {
  return (
    <PortfolioItem
      onDelete={deleteFunction}
      item={item}
      isEditing={isEditing}
    />
  );
};

export default PortfolioSlide;
