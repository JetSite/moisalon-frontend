import parseToFloat from "../../../../../utils/parseToFloat";
import { favoritesInStorage } from "../../../../../utils/favoritesInStorage";
import {
  WrapperItem,
  TopGoodWrapper,
  BottomGoodWrapper,
  Image,
  Favorite,
  Wrap,
  Name,
  Price,
  NewPrice,
  OldPrice,
} from "../styled";
import { useContext } from "react";
import { MeContext } from "../../../../../searchContext";
import { PHOTO_URL } from "../../../../../../variables";
import { red } from "../../../../../../styles/variables";
import HeartFullFill from "../../../MainPage/components/Header/icons/HeartFullFill";

const Good = ({
  product,
  deleteItem,
  setDeleteItem,
  cabinet = false,
  handleDeleted,
}) => {
  const [me] = useContext(MeContext);
  const addFavorite = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesInStorage("products", product);
    setDeleteItem(!deleteItem);
    handleDeleted && handleDeleted();
  };

  return (
    <WrapperItem cabinet={cabinet}>
      <TopGoodWrapper>
        <Image
          alt="image"
          src={
            product?.photoIds[0]
              ? `${PHOTO_URL}${product?.photoIds[0]}/original`
              : "/cosmetic_placeholder.jpg"
          }
        />
        <Favorite onClick={(e) => addFavorite(e, product)}>
          <HeartFullFill fill={red} />
        </Favorite>
      </TopGoodWrapper>
      <BottomGoodWrapper>
        <Wrap>
          <Name>{product?.title}</Name>
          {product?.dontShowPrice && !me?.info ? null : (
            <Price>
              <NewPrice>
                {product?.amount
                  ? `${product?.amount.toLocaleString()} ₽`
                  : "Цена по запросу"}{" "}
                <OldPrice>
                  {product?.currentAmount
                    ? `${product?.currentAmount.toLocaleString()}₽`
                    : null}
                </OldPrice>
              </NewPrice>
            </Price>
          )}
        </Wrap>
      </BottomGoodWrapper>
    </WrapperItem>
  );
};

export default Good;
