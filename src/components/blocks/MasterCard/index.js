import { useState, useEffect } from "react";
import { selectedGroupNamesMax } from "../../../utils/serviceCatalog";
import {
  favoritesInStorage,
  inStorage,
} from "../../../utils/favoritesInStorage";
import Share from "../../ui/Share";
import Rating from "../../ui/Rating";
import {
  MasterShareWrap,
  Item,
  MasterInfo,
  Image,
  Name,
  Specializations,
  FavoriteMaster,
  City,
  SkeletonMasterItem,
  RatingWrapper,
} from "./styles";
import HeartFullFill from "../../pages/MainPage/components/Header/icons/HeartFullFill";
import { red } from "../../../../styles/variables";

const MasterItem = ({
  master,
  catalog,
  loading,
  shareLink,
  type = "slider",
}) => {
  const [isFavorite, setIsFavorit] = useState(false);

  useEffect(() => {
    const isInStorage = inStorage("masters", master);
    setIsFavorit(!!isInStorage);
  }, []);

  const addFavorite = (e, master) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesInStorage("masters", master);
    setIsFavorit(!isFavorite);
  };
  return loading ? (
    <SkeletonMasterItem variant="rectangular" />
  ) : (
    <Item type={type} id={master.id}>
      <FavoriteMaster
        isFavorite={isFavorite}
        onClick={(e) => addFavorite(e, master)}
      >
        <HeartFullFill fill={isFavorite} />
      </FavoriteMaster>
      <Image alt="image" src={master?.photo?.url || null} />
      <MasterShareWrap>
        <Share link={shareLink} title={master?.name} />
      </MasterShareWrap>
      <MasterInfo>
        <div>
          <Name>{master?.name || ""}</Name>
        </div>
        <div>
          <Specializations>
            {selectedGroupNamesMax(
              master?.specializations ? master?.specializations[0] : [],
              catalog,
              ", ",
              1
            )}
          </Specializations>
        </div>
        <RatingWrapper>
          {master?.addressFull?.city ? (
            <City>{master?.addressFull?.city}</City>
          ) : null}
          <Rating
            averageScore={master?.averageScore}
            numberScore={master?.numberScore}
          />
        </RatingWrapper>
      </MasterInfo>
    </Item>
  );
};

export default MasterItem;
