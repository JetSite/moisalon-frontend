import { favoritesInStorage } from "../../../../../utils/favoritesInStorage";
import { Image, Item, Favorite } from "../styled";
import { PHOTO_URL } from "../../../../../../variables";
import HeartFullFill from "../../../MainPage/components/Header/icons/HeartFullFill";
import { red } from "../../../../../../styles/variables";

const BrandItem = ({ brand, deleteItem, setDeleteItem, handleDeleted }) => {
  const addFavorite = (e, brand) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesInStorage("brands", brand);
    setDeleteItem(!deleteItem);
    handleDeleted && handleDeleted();
  };
  return (
    <Item>
      <Image alt="logoBrand" src={`${PHOTO_URL}${brand?.logoId}/original`} />
      <Favorite onClick={(e) => addFavorite(e, brand)}>
        <HeartFullFill fill={red} />
      </Favorite>
    </Item>
  );
};

export default BrandItem;
